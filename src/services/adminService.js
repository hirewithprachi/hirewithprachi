import { supabase } from '../lib/supabase';

class AdminService {
  constructor() {
    this.baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
  }

  async getAuthHeaders() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    };
  }

  // Dashboard Statistics
  async getDashboardStats() {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/dashboard-stats`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  // Leads Management
  async getLeads(params = {}) {
    try {
      const headers = await this.getAuthHeaders();
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${this.baseUrl}/admin-dashboard/leads?${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const result = await response.json();
      return { data: result.data, pagination: result.pagination, error: result.error };
    } catch (error) {
      return { data: null, pagination: null, error: error.message };
    }
  }

  async createLead(leadData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/leads`, {
        method: 'POST',
        headers,
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to create lead');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async updateLead(id, leadData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/leads/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async deleteLead(id) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/leads/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }

      const result = await response.json();
      return { data: result.message, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  // Users Management
  async getUsers(params = {}) {
    try {
      const headers = await this.getAuthHeaders();
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${this.baseUrl}/admin-dashboard/users?${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();
      return { data: result.data, pagination: result.pagination, error: result.error };
    } catch (error) {
      return { data: null, pagination: null, error: error.message };
    }
  }

  async createUser(userData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/users`, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async updateUser(id, userData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/users/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async deleteUser(id) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/users/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const result = await response.json();
      return { data: result.message, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  // Blog Posts Management
  async getBlogPosts(params = {}) {
    try {
      const headers = await this.getAuthHeaders();
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${this.baseUrl}/admin-dashboard/blog-posts?${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const result = await response.json();
      return { data: result.data, pagination: result.pagination, error: result.error };
    } catch (error) {
      return { data: null, pagination: null, error: error.message };
    }
  }

  async createBlogPost(postData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/blog-posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async updateBlogPost(id, postData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/blog-posts/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog post');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async deleteBlogPost(id) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/blog-posts/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      const result = await response.json();
      return { data: result.message, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  // Services Management
  async getServices(params = {}) {
    try {
      const headers = await this.getAuthHeaders();
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${this.baseUrl}/admin-dashboard/services?${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }

      const result = await response.json();
      return { data: result.data, pagination: result.pagination, error: result.error };
    } catch (error) {
      return { data: null, pagination: null, error: error.message };
    }
  }

  async createService(serviceData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/services`, {
        method: 'POST',
        headers,
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error('Failed to create service');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async updateService(id, serviceData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/services/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async deleteService(id) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/admin-dashboard/services/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      const result = await response.json();
      return { data: result.message, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  // Analytics
  async getAnalytics(params = {}) {
    try {
      const headers = await this.getAuthHeaders();
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${this.baseUrl}/admin-dashboard/analytics?${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  // Files Management
  async getFiles(params = {}) {
    try {
      const headers = await this.getAuthHeaders();
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${this.baseUrl}/admin-dashboard/files?${queryParams}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const result = await response.json();
      return { data: result.data, pagination: result.pagination, error: result.error };
    } catch (error) {
      return { data: null, pagination: null, error: error.message };
    }
  }

  async uploadFile(file, category = 'general', description = '') {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('description', description);

      const response = await fetch(`${this.baseUrl}/file-upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async deleteFile(filePath) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/file-upload?path=${encodeURIComponent(filePath)}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      const result = await response.json();
      return { data: result.message, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  // Email Service
  async sendEmail(emailData) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/email-service`, {
        method: 'POST',
        headers,
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const result = await response.json();
      return { data: result.data, error: result.error };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }
}

export const adminService = new AdminService();
