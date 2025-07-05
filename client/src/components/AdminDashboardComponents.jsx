import React from 'react';
import styled from 'styled-components';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer 
} from 'recharts';
import { 
  FaUser, FaShoppingBag, FaCalendarAlt, FaRupeeSign,
  FaChartLine, FaChartBar, FaChartPie, FaListAlt,
  FaArrowUp, FaArrowDown, FaEquals
} from 'react-icons/fa';

// Styled components for the dashboard
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GridItem = styled.div`
  grid-column: span ${props => props.$span || 3};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1200px) {
    grid-column: span ${props => Math.min(props.$span * 2, 12) || 6};
  }
  
  @media (max-width: 768px) {
    grid-column: span 12;
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      font-size: 1.1rem;
      color: #a78bfa;
      margin: 0;
    }
    
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: ${props => props.$iconBg || 'rgba(167, 139, 250, 0.2)'};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${props => props.$iconColor || '#a78bfa'};
      font-size: 1.2rem;
    }
  }
  
  .value {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .comparison {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    
    .positive {
      color: #10b981;
    }
    
    .negative {
      color: #ef4444;
    }
    
    .neutral {
      color: #9ca3af;
    }
  }
`;

const ChartContainer = styled.div`
  height: 100%;
  min-height: 300px;
  
  h3 {
    font-size: 1.1rem;
    color: #a78bfa;
    margin-bottom: 1rem;
  }
`;

const OrderStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .status-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .status-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${props => props.$color};
    }
    
    .status-name {
      font-size: 0.9rem;
    }
  }
  
  .status-count {
    font-weight: 500;
  }
`;

const ListContainer = styled.div`
  h3 {
    font-size: 1.1rem;
    color: #a78bfa;
    margin-bottom: 1rem;
  }
  
  .list-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
    
    .item-info {
      display: flex;
      flex-direction: column;
      
      .item-title {
        font-weight: 500;
        margin-bottom: 0.25rem;
      }
      
      .item-subtitle {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    
    .item-value {
      font-weight: 500;
      display: flex;
      align-items: center;
    }
  }
`;

// COMPONENTS

// Stats Card Component
export const StatCardComponent = ({ title, value, icon, iconBg, iconColor, change, period }) => {
  // Determine direction of change
  let changeIcon, changeClass;
  if (change > 0) {
    changeIcon = <FaArrowUp />;
    changeClass = 'positive';
  } else if (change < 0) {
    changeIcon = <FaArrowDown />;
    changeClass = 'negative';
  } else {
    changeIcon = <FaEquals />;
    changeClass = 'neutral';
  }
  
  return (
    <StatCard $iconBg={iconBg} $iconColor={iconColor}>
      <div className="stat-header">
        <h3>{title}</h3>
        <div className="icon">
          {icon}
        </div>
      </div>
      <div className="value">{value}</div>
      <div className="comparison">
        <span className={changeClass}>
          {changeIcon} {Math.abs(change)}%
        </span>
        <span>vs {period}</span>
      </div>
    </StatCard>
  );
};

// Revenue Chart Component
export const RevenueChart = ({ data }) => {
  return (
    <ChartContainer>
      <h3>Revenue Trends</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          />
          <YAxis 
            tick={{ fill: 'rgba(255,255,255,0.7)' }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          />
          <Tooltip 
            contentStyle={{ 
              background: 'rgba(15, 23, 42, 0.8)', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#a78bfa" 
            fill="url(#colorRevenue)" 
            strokeWidth={2}
          />
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Orders by Category Chart Component
export const CategoryChart = ({ data }) => {
  const COLORS = ['#8b5cf6', '#6366f1', '#ec4899', '#f43f5e', '#10b981', '#3b82f6'];
  
  return (
    <ChartContainer>
      <h3>Orders by Category</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              background: 'rgba(15, 23, 42, 0.8)', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Legend 
            verticalAlign="bottom"
            iconType="circle" 
            layout="horizontal"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Order Status Component
export const OrderStatusComponent = ({ statusData }) => {
  const statuses = [
    { name: 'Completed', color: '#10b981' },
    { name: 'Processing', color: '#3b82f6' },
    { name: 'Pending', color: '#eab308' },
    { name: 'Cancelled', color: '#ef4444' }
  ];
  
  // Calculate total orders for percentage calculation
  const totalOrders = statusData.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <ChartContainer>
      <h3>Order Status</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          layout="vertical"
          data={statusData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            type="number" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fill: 'rgba(255,255,255,0.7)' }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          />
          <Tooltip 
            contentStyle={{ 
              background: 'rgba(15, 23, 42, 0.8)', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Bar dataKey="count" barSize={20}>
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={statuses[index].color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <OrderStatusContainer>
        {statuses.map((status, index) => {
          const statusItem = statusData.find(item => item.name.toLowerCase() === status.name.toLowerCase());
          const count = statusItem ? statusItem.count : 0;
          const percentage = totalOrders > 0 ? ((count / totalOrders) * 100).toFixed(1) : 0;
          
          return (
            <StatusItem key={index} $color={status.color}>
              <div className="status-info">
                <div className="status-dot"></div>
                <div className="status-name">{status.name}</div>
              </div>
              <div className="status-count">{count} ({percentage}%)</div>
            </StatusItem>
          );
        })}
      </OrderStatusContainer>
    </ChartContainer>
  );
};

// Recent Orders Component
export const RecentOrders = ({ orders }) => {
  return (
    <ListContainer>
      <h3>Recent Orders</h3>
      {orders.map((order, index) => (
        <div className="list-item" key={index}>
          <div className="item-info">
            <div className="item-title">Order #{order.id}</div>
            <div className="item-subtitle">{order.customer}</div>
          </div>
          <div className="item-value">₹{order.amount}</div>
        </div>
      ))}
    </ListContainer>
  );
};

// Top Products Component
export const TopProducts = ({ products }) => {
  return (
    <ListContainer>
      <h3>Top Products</h3>
      {products.map((product, index) => (
        <div className="list-item" key={index}>
          <div className="item-info">
            <div className="item-title">{product.name}</div>
            <div className="item-subtitle">{product.category}</div>
          </div>
          <div className="item-value">{product.sales} sales</div>
        </div>
      ))}
    </ListContainer>
  );
};

export const DashboardContainer = DashboardGrid;
export const DashboardItem = GridItem; 