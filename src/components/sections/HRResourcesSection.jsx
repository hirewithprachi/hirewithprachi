import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const resources = [
  {
    title: "HR Policy Template Pack",
    description: "Essential HR policy templates including Leave Policy, WFH Policy, and Code of Conduct.",
    icon: <FileText className="h-8 w-8" />,
    fileUrl: "https://assets.zyrosite.com/m5KL6Z7l2KCOQnZq/hr-policy-AMq85aprEgtQvRQX.pdf"
  },
  {
    title: "Recruitment Checklist",
    description: "Complete checklist for managing the hiring process from job posting to onboarding.",
    icon: <FileText className="h-8 w-8" />,
    fileUrl: "https://assets.zyrosite.com/m5KL6Z7l2KCOQnZq/recruitment-checklist-mp8JO3n0RMhpQpxe.pdf"
  }
];

const HRResourcesSection = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleDownload = async (e, fileUrl) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to download the resources.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, skip email sending since we're removing PHP backend
      // In future, this can be replaced with remote service integration
      console.log('Email would be sent to:', email);
      console.log('Resource would be downloaded:', fileUrl);

      // Trigger file download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.target = '_blank';
      link.download = fileUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Success!",
        description: "Thank you! The resources have been sent to your email.",
        className: "bg-green-500 text-white"
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Free HR Resources</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download our professionally crafted HR templates and checklists to streamline your HR processes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full sm:w-auto"
                    onClick={(e) => handleDownload(e, resource.fileUrl)}
                    disabled={isSubmitting}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Template
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
              >
                <Mail className="mr-2 h-4 w-4" /> Get Resources
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              By downloading, you agree to receive occasional updates about our services.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default HRResourcesSection;