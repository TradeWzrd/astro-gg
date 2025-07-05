import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaFilter, FaSearch } from 'react-icons/fa';
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
  background: ${props => props.danger 
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
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
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterButton = styled(motion.button)`
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid #4f46e5;
  background: ${props => props.active ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : 'transparent'};
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : 'rgba(79, 70, 229, 0.1)'};
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex-grow: 1;
  max-width: 400px;
  
  input {
    width: 100%;
    padding: 12px 18px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
    padding-left: 45px;
    
    &:focus {
      outline: none;
      border-color: #4f46e5;
      background: rgba(255, 255, 255, 0.1);
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
`;

const ServicesTable = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.2);
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  gap: 10px;
  
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const ServiceImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #2e2e54;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ServiceInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  .service-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .service-name {
    font-weight: 600;
  }

  .service-category {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: capitalize;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: ${props => props.danger 
    ? 'rgba(220, 38, 38, 0.1)'
    : props.success
      ? 'rgba(16, 185, 129, 0.1)'
      : 'rgba(79, 70, 229, 0.1)'
  };
  color: ${props => props.danger 
    ? '#ef4444'
    : props.success
      ? '#10b981'
      : '#818cf8'
  };
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background: ${props => props.danger 
      ? 'rgba(220, 38, 38, 0.2)'
      : props.success
        ? 'rgba(16, 185, 129, 0.2)'
        : 'rgba(79, 70, 229, 0.2)'
    };
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 8px;
`;

const PageButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: ${props => props.active ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : 'transparent'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: white;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  
  svg {
    animation: spin 1s linear infinite;
    font-size: 2rem;
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
`;

const ConfirmDialog = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 16px;
`;

const DialogContent = styled(motion.div)`
  background: #1f1f3f;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
  }
  
  p {
    margin-bottom: 24px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
`;

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  
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
    
    fetchServices();
  }, [isAuthenticated, isAdmin, activeCategory, currentPage, navigate]);
  
  const fetchServices = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10
      };
      
      if (activeCategory !== 'all') {
        params.category = activeCategory;
      }
      
      const response = await serviceAPI.getServices(params);
      setServices(response.data.services);
      setTotalPages(Math.ceil(response.data.total / 10));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
      setLoading(false);
    }
  };
  
  const handleCreateService = () => {
    navigate('/service-edit/new');
  };
  
  const handleEditService = (id) => {
    navigate(`/service-edit/${id}`);
  };
  
  const handleDeleteConfirm = (service) => {
    setConfirmDelete(service);
  };
  
  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };
  
  const handleDeleteService = async () => {
    if (!confirmDelete) return;
    
    try {
      await serviceAPI.deleteService(confirmDelete._id);
      toast.success(`${confirmDelete.name} deleted successfully`);
      setConfirmDelete(null);
      fetchServices(); // Refresh the list
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error('Failed to delete service');
    }
  };
  
  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing filters
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredServices = services.filter(service => {
    return service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           service.description.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'astrology', name: 'Astrology' },
    { id: 'numerology', name: 'Numerology' },
    { id: 'vastu', name: 'Vastu' }
  ];
  
  if (!isAuthenticated || !isAdmin) {
    return null; // This will prevent any flash of content before redirect
  }
  
  return (
    <>
      <GlassyNav />
      <PageContainer>
        <AdminHeader>
          <Title>Manage Services</Title>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateService}
          >
            <FaPlus /> Create New Service
          </Button>
        </AdminHeader>
        
        <FilterContainer>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <FaFilter style={{ marginTop: '10px' }} />
            {categories.map(category => (
              <FilterButton
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => handleCategoryFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </FilterButton>
            ))}
          </div>
          
          <SearchInput>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchInput>
        </FilterContainer>
        
        <ServicesTable>
          <TableHeader>
            <div>Service</div>
            <div>Price</div>
            <div>Category</div>
            <div style={{ textAlign: 'center' }}>Status</div>
            <div style={{ textAlign: 'center' }}>Actions</div>
          </TableHeader>
          
          {loading ? (
            <LoadingContainer>
              <FaSpinner />
            </LoadingContainer>
          ) : error ? (
            <EmptyState>
              <h3>Error Loading Services</h3>
              <p>{error}</p>
              <Button onClick={fetchServices}>Try Again</Button>
            </EmptyState>
          ) : filteredServices.length === 0 ? (
            <EmptyState>
              <h3>No Services Found</h3>
              <p>There are no services matching your criteria.</p>
              <Button onClick={handleCreateService}>
                <FaPlus /> Create New Service
              </Button>
            </EmptyState>
          ) : (
            filteredServices.map((service, index) => (
              <TableRow
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ServiceInfo>
                  <ServiceImage>
                    {service.image ? (
                      <img src={service.image} alt={service.name} />
                    ) : (
                      <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: '#3b3b64',
                        color: '#8b8bf8'
                      }}>
                        {service.name.charAt(0)}
                      </div>
                    )}
                  </ServiceImage>
                  <div className="service-details">
                    <div className="service-name">{service.name}</div>
                    <div className="service-category">{service.category}</div>
                  </div>
                </ServiceInfo>
                <div>
                  {typeof service.price === 'number' 
                    ? `₹${service.price.toLocaleString('en-IN')}` 
                    : service.price}
                </div>
                <div style={{ textTransform: 'capitalize' }}>{service.category}</div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ 
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    backgroundColor: service.active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                    color: service.active ? '#10b981' : '#ef4444'
                  }}>
                    {service.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <ActionButton
                    onClick={() => handleEditService(service._id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaEdit />
                  </ActionButton>
                  <ActionButton
                    danger
                    onClick={() => handleDeleteConfirm(service)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash />
                  </ActionButton>
                </div>
              </TableRow>
            ))
          )}
        </ServicesTable>
        
        {totalPages > 1 && (
          <Pagination>
            {[...Array(totalPages)].map((_, i) => (
              <PageButton
                key={i}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {i + 1}
              </PageButton>
            ))}
          </Pagination>
        )}
      </PageContainer>
      
      <AnimatePresence>
        {confirmDelete && (
          <ConfirmDialog
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DialogContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3>Delete Service</h3>
              <p>Are you sure you want to delete <strong>{confirmDelete.name}</strong>? This action cannot be undone.</p>
              <div className="actions">
                <Button 
                  onClick={handleDeleteCancel}
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  Cancel
                </Button>
                <Button 
                  danger 
                  onClick={handleDeleteService}
                >
                  Delete
                </Button>
              </div>
            </DialogContent>
          </ConfirmDialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminServicesPage;
