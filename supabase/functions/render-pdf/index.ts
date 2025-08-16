import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import jspdf from 'https://esm.sh/jspdf@2.5.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { markdown, title, outputPath, html } = await req.json()
    if ((!markdown && !html) || !outputPath) {
      return new Response(JSON.stringify({ error: 'Missing markdown/html or outputPath' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Basic PDF creation from text (markdown stripped to plain text)
    const text = html ? '' : String(markdown || '').replace(/\r\n/g, '\n')
    // @ts-ignore jspdf default export
    const { jsPDF } = jspdf
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const margin = 40
    const maxWidth = 515
    if (html) {
      const styled = `<!doctype html><html><head><meta charset='utf-8'><style>
        body { font-family: Helvetica, Arial, sans-serif; font-size: 12pt; color: #111; }
        h1,h2,h3 { color: #0f172a; margin: 0.4rem 0; }
        p { line-height: 1.5; margin: 0.25rem 0; }
        ul { margin: 0.25rem 1rem; }
      </style></head><body>${html}</body></html>`
      // @ts-ignore
      await doc.html(styled, { x: margin, y: margin, width: maxWidth })
    } else {
      const lines = doc.splitTextToSize(title ? `# ${title}\n\n${text}` : text, maxWidth)
      let y = margin
      const lineHeight = 16
      for (const line of lines) {
        if (y > 800 - margin) { doc.addPage(); y = margin }
        doc.text(line as string, margin, y)
        y += lineHeight
      }
    }
    const pdfArrayBuffer = doc.output('arraybuffer') as ArrayBuffer

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const upload = await supabase.storage.from('resource-downloads').upload(outputPath, new Uint8Array(pdfArrayBuffer), {
      contentType: 'application/pdf', upsert: true
    })
    if (upload.error) throw upload.error

    const { data: signed } = await supabase.storage.from('resource-downloads').createSignedUrl(outputPath, 300)
    return new Response(JSON.stringify({ success: true, signedUrl: signed?.signedUrl }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})


