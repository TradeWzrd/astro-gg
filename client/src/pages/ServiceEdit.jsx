import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSave, FaArrowLeft, FaPlus, FaTrash, FaSpinner } from 'react-icons/fa';
import { serviceAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import GlassyNav from '../components/GlassyNav';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 120px 40px 60px;
  background: linear-gradient(135deg, #0f0f1f 0%, #1f1f3f 100%);
  color: white;
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(to right, #fff, #a4b0ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: ${props => props.secondary 
    ? 'rgba(255, 255, 255, 0.1)'
    : props.success
      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'};
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 1rem;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    width: 18px;
    height: 18px;
    accent-color: #4f46e5;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const FAQHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
  margin: 0.25rem 0 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  
  svg {
    animation: spin 1s linear infinite;
    font-size: 2rem;
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
`;

const ServiceEditPage = () => {
  const { id } = useParams();
  const isNewService = id === 'new';
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'astrology',
    image: '',
    active: true,
    featured: false,
    faqs: [],
    seo: {
      title: '',
      description: '',
      keywords: ''
    }
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(!isNewService);
  const [submitting, setSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const isAdmin = user?.isAdmin;
  
  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!isAuthenticated) {
      toast.error('Please log in to access this page');
      navigate('/login');
      return;
    }
    
    if (!isAdmin) {
      toast.error('You are not authorized to access this page');
      navigate('/');
      return;
    }
    
    // Fetch service data if editing an existing service
    if (!isNewService) {
      fetchServiceData();
    }
  }, [isAuthenticated, isAdmin, isNewService, id, navigate]);
  
  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const response = await serviceAPI.getServiceById(id);
      const serviceData = response.data.service;
      
      // Format the data for the form
      setFormData({
        name: serviceData.name || '',
        description: serviceData.description || '',
        price: serviceData.price || '',
        category: serviceData.category || 'astrology',
        image: serviceData.image || '',
        active: serviceData.active !== false, // Default to true if not specified
        featured: serviceData.featured || false,
        faqs: serviceData.faqs || [],
        seo: {
          title: serviceData.seo?.title || '',
          description: serviceData.seo?.description || '',
          keywords: serviceData.seo?.keywords || ''
        }
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching service:', err);
      toast.error('Failed to load service data');
      setLoading(false);
      navigate('/admin-services'); // Redirect back to services list on error
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleFAQChange = (index, field, value) => {
    const updatedFAQs = [...formData.faqs];
    updatedFAQs[index] = {
      ...updatedFAQs[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      faqs: updatedFAQs
    }));
  };
  
  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };
  
  const removeFAQ = (index) => {
    const updatedFAQs = [...formData.faqs];
    updatedFAQs.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      faqs: updatedFAQs
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) && !formData.price.includes('–') && !formData.price.includes('-')) {
      newErrors.price = 'Price must be a number or a range (e.g. 1000-2000)';
    }
    
    // Validate each FAQ has both question and answer
    formData.faqs.forEach((faq, index) => {
      if (!faq.question.trim() || !faq.answer.trim()) {
        newErrors[`faq-${index}`] = 'Both question and answer are required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Format the data for the API
      let serviceData = {
        ...formData,
        // Make sure image has a default value if empty
        image: formData.image || 'https://via.placeholder.com/300x200?text=Service+Image',
      };
      
      // Convert price to number if it's a plain number
      if (!isNaN(Number(formData.price)) && !formData.price.includes('–') && !formData.price.includes('-')) {
        serviceData.price = Number(formData.price);
      }
      
      // Generate slug if not provided
      if (!serviceData.slug) {
        serviceData.slug = formData.name.toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove non-word chars
          .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
          .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
      }
      
      // Filter out empty FAQs
      if (serviceData.faqs && serviceData.faqs.length > 0) {
        serviceData.faqs = serviceData.faqs.filter(faq => 
          faq.question.trim() !== '' && faq.answer.trim() !== ''
        );
      }
      
      console.log('Submitting service data:', serviceData);
      
      if (isNewService) {
        const response = await serviceAPI.createService(serviceData);
        console.log('Service creation response:', response.data);
        toast.success('Service created successfully');
      } else {
        const response = await serviceAPI.updateService(id, serviceData);
        console.log('Service update response:', response.data);
        toast.success('Service updated successfully');
      }
      
      navigate('/admin-services');
    } catch (err) {
      console.error('Error saving service:', err);
      const errorMsg = err.response?.data?.message || `Failed to ${isNewService ? 'create' : 'update'} service`;
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/admin-services');
  };
  
  if (!isAuthenticated || !isAdmin) {
    return null; // This will prevent any flash of content before redirect
  }
  
  if (loading) {
    return (
      <>
        <GlassyNav />
        <PageContainer>
          <LoadingContainer>
            <FaSpinner />
          </LoadingContainer>
        </PageContainer>
      </>
    );
  }
  
  return (
    <>
      <GlassyNav />
      <PageContainer>
        <AdminHeader>
          <Title>{isNewService ? 'Create New Service' : 'Edit Service'}</Title>
          <Button
            secondary
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
          >
            <FaArrowLeft /> Back to Services
          </Button>
        </AdminHeader>
        
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="name">Service Name*</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="E.g., Birth Chart Analysis"
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="category">Category*</Label>
              <Select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="astrology">Astrology</option>
                <option value="numerology">Numerology</option>
                <option value="vastu">Vastu</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="price">Price*</Label>
              <Input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="E.g., 5999 or ₹5,000 – ₹10,000"
              />
              {errors.price && <ErrorText>{errors.price}</ErrorText>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="image">Image URL</Label>
              <Input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="description">Description*</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the service..."
                rows="5"
              />
              {errors.description && <ErrorText>{errors.description}</ErrorText>}
            </FormGroup>
            
            <div style={{ display: 'flex', gap: '2rem' }}>
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="active">Active</Label>
                </Checkbox>
              </FormGroup>
              
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </Checkbox>
              </FormGroup>
            </div>
          </FormSection>
          
          <div>
            <FormSection>
              <SectionTitle>SEO Information</SectionTitle>
              
              <FormGroup>
                <Label htmlFor="seo.title">SEO Title</Label>
                <Input
                  type="text"
                  id="seo.title"
                  name="seo.title"
                  value={formData.seo.title}
                  onChange={handleInputChange}
                  placeholder="SEO optimized title"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="seo.description">SEO Description</Label>
                <TextArea
                  id="seo.description"
                  name="seo.description"
                  value={formData.seo.description}
                  onChange={handleInputChange}
                  placeholder="Meta description for search engines"
                  rows="3"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="seo.keywords">SEO Keywords</Label>
                <Input
                  type="text"
                  id="seo.keywords"
                  name="seo.keywords"
                  value={formData.seo.keywords}
                  onChange={handleInputChange}
                  placeholder="Keywords separated by commas"
                />
              </FormGroup>
            </FormSection>
            
            <FormSection style={{ marginTop: '2rem' }}>
              <SectionTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Frequently Asked Questions</span>
                  <Button
                    type="button"
                    onClick={addFAQ}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                  >
                    <FaPlus /> Add FAQ
                  </Button>
                </div>
              </SectionTitle>
              
              <FAQContainer>
                {formData.faqs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    No FAQs added yet. Click "Add FAQ" to create one.
                  </div>
                ) : (
                  formData.faqs.map((faq, index) => (
                    <FAQItem key={index}>
                      <FAQHeader>
                        <Label>Question {index + 1}</Label>
                        <Button
                          type="button"
                          onClick={() => removeFAQ(index)}
                          style={{ 
                            padding: '6px', 
                            background: 'rgba(220, 38, 38, 0.1)', 
                            color: '#ef4444',
                            boxShadow: 'none'
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTrash />
                        </Button>
                      </FAQHeader>
                      
                      <Input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                        placeholder="Enter question"
                      />
                      
                      <Label>Answer</Label>
                      <TextArea
                        value={faq.answer}
                        onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                        placeholder="Enter answer"
                        rows="3"
                      />
                      
                      {errors[`faq-${index}`] && <ErrorText>{errors[`faq-${index}`]}</ErrorText>}
                    </FAQItem>
                  ))
                )}
              </FAQContainer>
            </FormSection>
          </div>
          
          <FormActions style={{ gridColumn: '1 / -1' }}>
            <Button
              type="button"
              secondary
              onClick={handleCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              success
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.05 }}
              whileTap={{ scale: submitting ? 1 : 0.95 }}
            >
              {submitting ? <FaSpinner /> : <FaSave />} {isNewService ? 'Create Service' : 'Save Changes'}
            </Button>
          </FormActions>
        </Form>
      </PageContainer>
    </>
  );
};

export default ServiceEditPage;
