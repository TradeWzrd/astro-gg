import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSave } from 'react-icons/fa';
import ShootingStars from '../components/ShootingStars';
import { productAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import FlickeringStars from '../components/FlickeringStars';

const PageContainer = styled.div`
  flex: 1;
  padding: 2rem;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AddButton = styled(motion.button)`
  background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
`;

const ProductTable = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  th {
    color: #a78bfa;
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const StockBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  background: ${props => props.inStock ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.inStock ? '#22c55e' : '#ef4444'};
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  color: #a78bfa;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;

  &:hover {
    background: rgba(167, 139, 250, 0.1);
  }
`;

const Products = () => {
  // State for products management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for product form
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'astrology',
    countInStock: 0,
    image: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await productAPI.getProducts();
      setProducts(data.products || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  // Handle opening the form for creating a new product
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductFormData({
      name: '',
      price: '',
      description: '',
      category: 'astrology',
      countInStock: 10,
      image: ''
    });
    setFormErrors({});
    setShowProductForm(true);
  };

  // Handle opening the form for editing an existing product
  const handleEditProduct = (id) => {
    const product = products.find(p => p._id === id);
    if (product) {
      setSelectedProduct(product);
      setProductFormData({
        name: product.name,
        price: product.price,
        description: product.description || '',
        category: product.category || 'astrology',
        countInStock: product.countInStock || 0,
        image: product.images && product.images.length > 0 ? product.images[0].url : (product.image || '')
      });
      setFormErrors({});
      setShowProductForm(true);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        toast.success('Product deleted successfully');
        fetchProducts(); // Refresh the products list
      } catch (err) {
        console.error('Error deleting product:', err);
        toast.error('Failed to delete product');
      }
    }
  };
  
  // Handle product form submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const errors = {};
    if (!productFormData.name.trim()) errors.name = 'Name is required';
    if (!productFormData.price) errors.price = 'Price is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      // Prepare product data
      const productData = {
        ...productFormData,
        // Ensure price is a number
        price: Number(productFormData.price),
        // Ensure countInStock is a number
        countInStock: Number(productFormData.countInStock),
        // Add default image if empty
        images: productFormData.image ? 
          [{ url: productFormData.image, alt: productFormData.name }] : 
          [{ url: 'https://source.unsplash.com/random/300x200/?product', alt: productFormData.name }]
      };
      
      if (selectedProduct) {
        // Update existing product
        await productAPI.updateProduct(selectedProduct._id, productData);
        toast.success('Product updated successfully');
      } else {
        // Create new product
        await productAPI.createProduct(productData);
        toast.success('Product created successfully');
      }
      
      // Reset form and refresh products
      setShowProductForm(false);
      setSelectedProduct(null);
      fetchProducts();
      
    } catch (err) {
      console.error('Error saving product:', err);
      toast.error(err.response?.data?.message || 'Failed to save product');
    }
  };

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />
      
      <Header>
        <Title>Products</Title>
        <AddButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddProduct}
        >
          <FaPlus /> Add Product
        </AddButton>
      </Header>

      {showProductForm ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>
            {selectedProduct ? 'Edit Product' : 'Create New Product'}
          </h3>
          
          <form onSubmit={handleProductSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Product Name*
                </label>
                <input 
                  type="text" 
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({...productFormData, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${formErrors.name ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                {formErrors.name && (
                  <p style={{ color: '#ef4444', margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
                    {formErrors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Price*
                </label>
                <input 
                  type="number" 
                  value={productFormData.price}
                  onChange={(e) => setProductFormData({...productFormData, price: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${formErrors.price ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                {formErrors.price && (
                  <p style={{ color: '#ef4444', margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
                    {formErrors.price}
                  </p>
                )}
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Category*
                </label>
                <select
                  value={productFormData.category}
                  onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                >
                  <option value="astrology">Astrology</option>
                  <option value="numerology">Numerology</option>
                  <option value="vastu">Vastu</option>
                </select>
              </div>
              

              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Stock Quantity
                </label>
                <input 
                  type="number" 
                  value={productFormData.countInStock}
                  onChange={(e) => setProductFormData({...productFormData, countInStock: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Image URL
                </label>
                <input 
                  type="text" 
                  value={productFormData.image}
                  onChange={(e) => setProductFormData({...productFormData, image: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  placeholder="https://example.com/image.jpg"
                />
                <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>
                  Leave empty for a default placeholder image
                </small>
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Description
                </label>
                <textarea 
                  value={productFormData.description}
                  onChange={(e) => setProductFormData({...productFormData, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    minHeight: '100px',
                    resize: 'vertical'
                  }}
                  placeholder="Detailed description of the product..."
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                type="button"
                onClick={() => setShowProductForm(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FaSave /> {selectedProduct ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <FaSpinner style={{
            fontSize: '2rem',
            color: '#a78bfa',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }} />
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
          <p>{error}</p>
          <button
            onClick={fetchProducts}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '1rem'
            }}
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          <p>No products found. Create your first product to get started!</p>
        </div>
      ) : (
        <ProductTable>
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {(product.images && product.images.length > 0) ? (
                        <img 
                          src={product.images[0].url} 
                          alt={product.images[0].alt || product.name}
                          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://source.unsplash.com/random/40x40/?product';
                          }}
                        />
                      ) : product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://source.unsplash.com/random/40x40/?product';
                          }}
                        />
                      ) : null}
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>₹{typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : product.price}</td>
                  <td>
                    <StockBadge inStock={product.countInStock > 0}>
                      {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                    </StockBadge>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                  <td>
                    <ActionButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditProduct(product._id)}
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <FaTrash />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ProductTable>
      )}
    </PageContainer>
  );
};

export default Products;
