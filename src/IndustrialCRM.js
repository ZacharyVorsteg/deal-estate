import React, { useState, useEffect } from 'react';
import {
  Building2,
  Mail,
  Phone,
  DollarSign,
  MapPin,
  Loader,
  CheckCircle,
  AlertCircle,
  Upload,
  User,
  Edit2,
  Trash2,
  Eye,
  X,
  Image,
  Plus,
  Settings,
  CreditCard,
  Calendar,
  TrendingUp,
  Filter,
  Archive,
  ChevronRight,
  Bell,
  Home,
  Users,
  Search,
  Menu,
  UserPlus,
  Clock,
  CheckCircle2,
  ShieldCheck

} from 'lucide-react';


/**
 * Main CRM component. This encapsulates all the views, state and logic for
 * managing properties, clients and notifications. The UI is styled using
 * TailwindCSS classes that are included via CDN in index.html.
 */
const IndustrialCRM = () => {
  // View state
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Data stores
  const [properties, setProperties] = useState([]);
  const [clients, setClients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [smtpEnabled, setSmtpEnabled] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [leaseHistory, setLeaseHistory] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // User profile mock
  const [userProfile, setUserProfile] = useState({
    name: 'John Anderson',
    company: 'Prime Industrial Realty',
    email: 'john@primeindustrial.com',
    phone: '(555) 123-4567',
    logo: null,
 
    subscription: 'Professional',
    billingCycle: 'monthly',
    nextBilling: '2024-02-15',
    cardLast4: '4242'
  });

  // Form states
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: 'admin' });
  const [propertyForm, setPropertyForm] = useState({
    title: '', city: '', state: '', price: '', property_type: '', loading_docks: '', ceiling_height: '',
    image: null, sqft: '', year_built: '', zoning: '', description: ''
  });
  const [criteriaForm, setCriteriaForm] = useState({
    name: '', email: '', phone: '', min_price: '', max_price: '', city: '', state: '',
    property_type: '', loading_docks: '', ceiling_height: '', mandatory_docks: false, mandatory_ceiling: false,
    source: 'manual', notes: ''
  });
  const [manualClientForm, setManualClientForm] = useState({
    name: '', email: '', phone: '', company: '', source: 'phone', notes: '',
    min_price: '', max_price: '', city: '', state: '', property_type: '', status: 'active',
    loading_docks: '', ceiling_height: '', mandatory_docks: false, mandatory_ceiling: false
  });

  // Form validation and feedback states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Colour palette used throughout the application
  const colors = {
    primary: '#1a1a1a',
    secondary: '#2d2d2d',
    accent: '#ff6b35',
    success: '#00c896',
    warning: '#ffb84d',
    danger: '#ff4757',
    background: '#f8f9fa',
    cardBg: '#ffffff',
    textPrimary: '#1a1a1a',
    textSecondary: '#6c757d',
    border: '#e9ecef'
  };


  // Matching clients preview state
  const [matchingClients, setMatchingClients] = useState([]);

  // Initialise some sample data when the user logs in
  useEffect(() => {
    if (isLoggedIn) {
      // Sample properties
      setProperties([
        {
          id: 1,
          title: 'Modern Distribution Center',
          city: 'Miami',
          state: 'FL',
          price: 2500000,
          property_type: 'Warehouse',
          loading_docks: 8,
          ceiling_height: 32,
          sqft: 45000,
          year_built: 2019,
          zoning: 'Industrial',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UwZTBlMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5XYXJlaG91c2UgSW1hZ2U8L3RleHQ+PC9zdmc+',
          status: 'active',
          created_at: '2024-01-15T10:00:00Z',
          views: 145,
          inquiries: 12
        },

        
        {
          id: 2,
          title: 'Tech Manufacturing Facility',
          city: 'Orlando',
          state: 'FL',
          price: 3200000,

          property_type: 'Industrial',
          loading_docks: 4,
          ceiling_height: 28,
          sqft: 35000,
          year_built: 2021,
          zoning: 'Light Industrial',
          status: 'active',
          created_at: '2024-01-10T10:00:00Z',
          views: 89,
          inquiries: 5
        }
      ]);

      // Sample clients
      setClients([
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah@techlogistics.com',
          phone: '(555) 234-5678',
          company: 'Tech Logistics Inc',
          source: 'website',
          status: 'active',
          leasedPropertyId: null,
          leaseStartDate: null,
          leaseEndDate: null,
          priceProtection: null,
          lastContact: '2024-01-20T10:00:00Z',
          criteria: {
            min_price: 1000000,
            max_price: 3000000,
            city: 'Miami',
            state: 'FL',
            property_type: 'Warehouse',
            loading_docks: 6,
            ceiling_height: 30,
            mandatory_docks: 1,
            mandatory_ceiling: 0
          },
          notes: 'Looking to expand operations in Q2',
          created_at: '2024-01-05T10:00:00Z'
        }
      ]);
    }
  }, [isLoggedIn]);

  /**
   * Handles login. Since this is a proof-of-concept, any non-empty username
   * and password will succeed and navigate to the dashboard.
   */
  const handleLogin = () => {
    if (loginForm.username && loginForm.password) {
      setIsLoggedIn(true);
      setCurrentView('dashboard');
    }
  };

  /**
   * Logs the user out and returns to the login screen.
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  /**
   * Handles image uploads in the property form. Uses FileReader to convert
   * selected image to a base64 data URL so it can be previewed before upload.
   */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPropertyForm({ ...propertyForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Whenever the property form fields change, compute matching clients.
   */
  useEffect(() => {
    if (currentView === 'add-property' && propertyForm.price && propertyForm.city && propertyForm.state) {
      const tempProperty = {
        city: propertyForm.city,
        state: propertyForm.state,
        price: parseFloat(propertyForm.price) || 0,
        property_type: propertyForm.property_type,
        loading_docks: propertyForm.loading_docks ? parseInt(propertyForm.loading_docks) : null,
        ceiling_height: propertyForm.ceiling_height ? parseInt(propertyForm.ceiling_height) : null
      };
      const matching = clients.filter((client) => {
        if (client.status !== 'active') return false;
        if (client.priceProtection && tempProperty.price < client.priceProtection) return false;
        return criteriaMatches(tempProperty, client.criteria);
      });
      setMatchingClients(matching);
    } else {
      setMatchingClients([]);
    }
  }, [propertyForm, clients, currentView]);

  /**
   * Validates and adds a new property, then notifies matching clients.
   */
  const handleAddProperty = async () => {
    // Clear previous messages
    setFormErrors({});
    setErrorMessage('');
    setSuccessMessage('');

    // Validate required fields
    const errors = {};
    if (!propertyForm.title?.trim()) errors.title = 'Property title is required';
    if (!propertyForm.city?.trim()) errors.city = 'City is required';
    if (!propertyForm.state?.trim()) errors.state = 'State is required';
    if (!propertyForm.price || propertyForm.price <= 0) errors.price = 'Valid price is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setErrorMessage('Please fix the errors below');
      return;
    }

    setIsSubmitting(true);
    
    try {
    const newProperty = {
      id: Date.now(),
        title: propertyForm.title.trim(),
        city: propertyForm.city.trim(),
        state: propertyForm.state.trim(),
      price: parseFloat(propertyForm.price),
        property_type: propertyForm.property_type || null,
      loading_docks: propertyForm.loading_docks ? parseInt(propertyForm.loading_docks) : null,
      ceiling_height: propertyForm.ceiling_height ? parseInt(propertyForm.ceiling_height) : null,
      sqft: propertyForm.sqft ? parseInt(propertyForm.sqft) : null,
        year_built: propertyForm.year_built || null,
        zoning: propertyForm.zoning || null,
        description: propertyForm.description || null,
      image: propertyForm.image,
      status: 'active',
      created_at: new Date().toISOString(),
      views: 0,
      inquiries: 0
    };

      setProperties(prev => [newProperty, ...prev]);
      
    // Notify matching clients
    const activeMatchingClients = matchingClients.filter((client) => client.status === 'active');
    activeMatchingClients.forEach((client) => {
      sendNotification(client, newProperty);
    });

      // Show success message
      setSuccessMessage(`Property added successfully! ${activeMatchingClients.length} active client(s) notified.`);
      
    // Reset form
    setPropertyForm({
      title: '', city: '', state: '', price: '', property_type: '', loading_docks: '',
      ceiling_height: '', image: null, sqft: '', year_built: '', zoning: '', description: ''
    });
    setMatchingClients([]);
      
      // Navigate back after success
      setTimeout(() => {
    setCurrentView('properties');
        setSuccessMessage('');
      }, 2000);
      
    } catch (error) {
      setErrorMessage('Failed to add property. Please try again.');
      console.error('Error adding property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Adds a client manually. This is used when not using an automated lead
   * capture mechanism. Ensures required fields are provided.
   */
  const handleAddManualClient = () => {
    if (!manualClientForm.name || (!manualClientForm.email && !manualClientForm.phone)) {
      alert('Please provide name and either email or phone');
      return;
    }
    const newClient = {
      id: Date.now(),
      name: manualClientForm.name,
      email: manualClientForm.email,
      phone: manualClientForm.phone,
      company: manualClientForm.company,
      source: manualClientForm.source,
      status: manualClientForm.status || 'active',
      leasedPropertyId: null,
      leaseStartDate: null,
      leaseEndDate: null,
      priceProtection: null,
      lastContact: new Date().toISOString(),
      criteria: {
        min_price: manualClientForm.min_price ? parseFloat(manualClientForm.min_price) : null,
        max_price: manualClientForm.max_price ? parseFloat(manualClientForm.max_price) : null,
        city: manualClientForm.city || null,
        state: manualClientForm.state || null,
        property_type: manualClientForm.property_type || null,
        loading_docks: null,
        ceiling_height: null,
        mandatory_docks: 0,
        mandatory_ceiling: 0
      },
      notes: manualClientForm.notes,
      created_at: new Date().toISOString()
    };
    setClients([...clients, newClient]);
    alert('Client added successfully!');
    setManualClientForm({
      name: '', email: '', phone: '', company: '', source: 'phone', notes: '',
      min_price: '', max_price: '', city: '', state: '', property_type: '', status: 'active'
    });
    setCurrentView('clients');
  };

  /**
   * Archives a property. This is a soft delete – the record remains but is
   * marked as archived and hidden from active lists.
   */
  const handleArchiveProperty = (propertyId) => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId 
        ? { ...property, status: 'archived' }
        : property
    ));
    setSuccessMessage('Property archived successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };



  /**
   * Updates the user profile with provided changes.
   */
  const handleUpdateProfile = (updates) => {
    setUserProfile({ ...userProfile, ...updates });
    alert('Profile updated successfully!');
  };

  /**
   * Handles leasing a property to a client.
   */
  const handleLeaseProperty = (clientId, propertyId) => {
    // Update client status to leased
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, status: 'leased', leasedProperty: propertyId, leasedAt: new Date().toISOString() }
        : client
    ));
    
    // Update property status to leased
    setProperties(prev => prev.map(property => 
      property.id === propertyId 
        ? { ...property, status: 'leased', leasedTo: clientId, leasedAt: new Date().toISOString() }
        : property
    ));
    
    // Add to lease history
    const client = clients.find(c => c.id === clientId);
    const property = properties.find(p => p.id === propertyId);
      const leaseRecord = {
        id: Date.now(),
        clientId,
        propertyId,
      clientName: client?.name,
      propertyTitle: property?.title,
      leasedAt: new Date().toISOString(),
      status: 'active'
    };
    setLeaseHistory(prev => [leaseRecord, ...prev]);
    
    // Show success message
    setSuccessMessage(`${client?.name} has successfully leased ${property?.title}`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  /**
   * Handles editing a property.
   */
  const handleEditProperty = (property) => {
    setPropertyForm({
      title: property.title || '',
      city: property.city || '',
      state: property.state || '',
      price: property.price || '',
      property_type: property.property_type || '',
      loading_docks: property.loading_docks || '',
      ceiling_height: property.ceiling_height || '',
      sqft: property.sqft || '',
      year_built: property.year_built || '',
      zoning: property.zoning || '',
      description: property.description || '',
      image: property.image || null
    });
    setCurrentView('add-property');
  };

  /**
   * Handles deleting a property.
   */
  const handleDeleteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      setSuccessMessage('Property deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  /**
   * Handles editing a client.
   */
  const handleEditClient = (client) => {
    setManualClientForm({
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      company: client.company || '',
      source: client.source || 'manual',
      notes: client.notes || '',
      min_price: client.min_price || '',
      max_price: client.max_price || '',
      city: client.city || '',
      state: client.state || '',
      property_type: client.property_type || '',
      status: client.status || 'active'
    });
    setCurrentView('add-manual-client');
  };

  /**
   * Handles deleting a client.
   */
  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      setClients(prev => prev.filter(c => c.id !== clientId));
      setSuccessMessage('Client deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  /**
   * Handles reactivating a property.
   */
  const handleReactivateProperty = (propertyId) => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId 
        ? { ...property, status: 'active' }
        : property
    ));
    setSuccessMessage('Property reactivated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  /**
   * Handles updating client status.
   */
  const handleUpdateClientStatus = (clientId, newStatus) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, status: newStatus }
        : client
    ));
    setSuccessMessage(`Client status updated to ${newStatus}`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  /**
   * Handles adding a new client with validation.
   */
  const handleAddClient = async () => {
    // Clear previous messages
    setFormErrors({});
    setErrorMessage('');
    setSuccessMessage('');

    // Validate required fields
    const errors = {};
    if (!manualClientForm.name?.trim()) errors.name = 'Client name is required';
    if (!manualClientForm.email?.trim() && !manualClientForm.phone?.trim()) {
      errors.contact = 'Either email or phone is required';
    }
    if (manualClientForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(manualClientForm.email)) {
      errors.email = 'Valid email format is required';
    }
    if (manualClientForm.min_price && manualClientForm.min_price < 0) errors.min_price = 'Minimum price cannot be negative';
    if (manualClientForm.max_price && manualClientForm.max_price < 0) errors.max_price = 'Maximum price cannot be negative';
    if (manualClientForm.min_price && manualClientForm.max_price && parseFloat(manualClientForm.min_price) > parseFloat(manualClientForm.max_price)) {
      errors.priceRange = 'Minimum price cannot exceed maximum price';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setErrorMessage('Please fix the errors below');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newClient = {
        id: Date.now(),
        name: manualClientForm.name.trim(),
        email: manualClientForm.email?.trim() || null,
        phone: manualClientForm.phone?.trim() || null,
        company: manualClientForm.company?.trim() || null,
        source: manualClientForm.source,
        notes: manualClientForm.notes?.trim() || null,
        min_price: manualClientForm.min_price ? parseFloat(manualClientForm.min_price) : null,
        max_price: manualClientForm.max_price ? parseFloat(manualClientForm.max_price) : null,
        city: manualClientForm.city?.trim() || null,
        state: manualClientForm.state?.trim() || null,
        property_type: manualClientForm.property_type || null,
        status: manualClientForm.status,
        criteria: {
          min_price: manualClientForm.min_price ? parseFloat(manualClientForm.min_price) : null,
          max_price: manualClientForm.max_price ? parseFloat(manualClientForm.max_price) : null,
          city: manualClientForm.city?.trim() || null,
          state: manualClientForm.state?.trim() || null,
          property_type: manualClientForm.property_type || null,
          loading_docks: manualClientForm.loading_docks ? parseInt(manualClientForm.loading_docks) : null,
          ceiling_height: manualClientForm.ceiling_height ? parseInt(manualClientForm.ceiling_height) : null,
          mandatory_docks: manualClientForm.mandatory_docks ? 1 : 0,
          mandatory_ceiling: manualClientForm.mandatory_ceiling ? 1 : 0
        },
        created_at: new Date().toISOString()
      };

      setClients(prev => [newClient, ...prev]);
      
      // Show success message
      setSuccessMessage('Client added successfully!');
      
      // Reset form
      setManualClientForm({
        name: '', email: '', phone: '', company: '', source: 'phone', notes: '',
        min_price: '', max_price: '', city: '', state: '', property_type: '', status: 'active'
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Navigate back to clients
      setTimeout(() => setCurrentView('clients'), 1000);
      
    } catch (error) {
      setErrorMessage('Failed to add client. Please try again.');
      console.error('Error adding client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Enhanced error display component
   */
  const ErrorMessage = ({ message }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-500" />
        <p className="text-red-700 font-medium">{message}</p>
      </div>
    </div>
  );

  /**
   * Enhanced success display component
   */
  const SuccessMessage = ({ message }) => (
    <div className="text-green-700 font-medium">{message}</div>
  );

  /**
   * Determines if a property meets a client's search criteria.
   */
  const criteriaMatches = (property, criteria) => {
    if (criteria.min_price !== null && property.price < criteria.min_price) return false;
    if (criteria.max_price !== null && property.price > criteria.max_price) return false;
    if (criteria.city && property.city && property.city.toLowerCase() !== criteria.city.toLowerCase()) return false;
    if (criteria.state && property.state && property.state.toLowerCase() !== criteria.state.toLowerCase()) return false;
    if (
      criteria.property_type &&
      property.property_type &&
      property.property_type.toLowerCase() !== criteria.property_type.toLowerCase()
    )
      return false;
    if (criteria.loading_docks !== null) {
      if (criteria.mandatory_docks === 1) {
        if (property.loading_docks === null || property.loading_docks < criteria.loading_docks) return false;
      }
    }
    if (criteria.ceiling_height !== null) {
      if (criteria.mandatory_ceiling === 1) {
        if (property.ceiling_height === null || property.ceiling_height < criteria.ceiling_height) return false;
      }
    }
    return true;
  };

  /**
   * Creates a notification entry. If SMTP is enabled, status is 'Sent'; otherwise
   * we simulate sending by printing to console.
   */
  const sendNotification = (client, property) => {
    const subject = `New property matches your criteria: ${property.title}`;
    const message =
      `A new property titled '${property.title}' located at ${property.city}, ${property.state} ` +
      `with a price of $${property.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} matches your saved criteria.`;
    const notification = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      client: client.email || client.phone,
      clientName: client.name,
      property: property.title,
      propertyImage: property.image,
      method: smtpEnabled ? 'SMTP Email' : 'Console Output',
      status: smtpEnabled ? 'Sent' : 'Printed',
      message,
      subject
    };
    setNotifications((prev) => [notification, ...prev]);
    if (!smtpEnabled) {
      console.log(`Notification (mock) to ${client.name}: ${message}`);
    }
  };

  /**
   * Sidebar with exact specification implementation.
   */
  const Sidebar = () => (
    <div
      className="fixed inset-y-0 left-0 z-40 flex flex-col sidebar-icon-fix"
      style={{
        width: '200px',
        background: 'linear-gradient(180deg, #0F0F10 0%, #0A0A0B 100%)',
        borderRight: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      {/* Logo/Brand Area */}
      <div className="sidebar-logo" style={{ 
        height: '60px', 
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="sidebar-logo-icon" style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: '700',
          color: 'white',
          marginRight: '12px'
        }}>
          DE
        </div>
        <div className="sidebar-logo-text">
          <div className="sidebar-logo-title" style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
            Deal Estate
          </div>
          <div className="sidebar-logo-subtitle" style={{ fontSize: '11px', color: '#71717A' }}>
            Professional
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          <SidebarItem 
            icon={Home} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => { setCurrentView('dashboard'); setShowMobileMenu(false); }} 
          />
          <SidebarItem 
            icon={Building2} 
            label="Properties" 
            active={currentView === 'properties'} 
            onClick={() => { setCurrentView('properties'); setShowMobileMenu(false); }} 
          />
          <SidebarItem 
            icon={Users} 
            label="Clients" 
            active={currentView === 'clients'} 
            onClick={() => { setCurrentView('clients'); setShowMobileMenu(false); }} 
          />
          <SidebarItem 
            icon={Bell} 
            label="Notifications" 
            active={currentView === 'notifications'} 
            onClick={() => { setCurrentView('notifications'); setShowMobileMenu(false); }} 
          />
          <SidebarItem 
            icon={TrendingUp} 
            label="Analytics" 
            active={currentView === 'analytics'} 
            onClick={() => { setCurrentView('analytics'); setShowMobileMenu(false); }} 
          />
          
          {/* Section divider */}
          <div 
            className="sidebar-divider"
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.05)',
              margin: '12px 16px'
            }}
          />
          
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={currentView === 'settings'} 
            onClick={() => { setCurrentView('settings'); setShowMobileMenu(false); }} 
          />
          <SidebarItem 
            icon={CreditCard} 
            label="Billing" 
            active={currentView === 'billing'} 
            onClick={() => { setCurrentView('billing'); setShowMobileMenu(false); }} 
          />
        </nav>

        {/* User Profile Section */}
        <div className="sidebar-profile" style={{
          padding: '16px',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div className="flex items-center gap-3">
            <div className="sidebar-profile-avatar" style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white'
            }}>
              {userProfile.name.charAt(0)}
            </div>
            <div className="sidebar-profile-info flex-1">
              <div className="sidebar-profile-name" style={{ 
                fontSize: '13px', 
                fontWeight: '500', 
                color: '#FFFFFF' 
              }}>
                {userProfile.name}
              </div>
              <div className="sidebar-profile-role" style={{ 
                fontSize: '11px', 
                color: '#71717A' 
              }}>
                {userProfile.company}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="sidebar-signout"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              color: '#A1A1AA',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = '#E4E4E7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = '#A1A1AA';
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * Sidebar navigation item with exact specification implementation.
   */
  const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`sidebar-nav-item ${active ? 'active' : ''}`}
      style={{
        width: 'calc(100% - 16px)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        height: '40px',
        padding: '0 16px',
        margin: '2px 8px',
        borderRadius: '8px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        background: active ? 'linear-gradient(90deg, rgba(59,130,246,0.15) 0%, transparent 100%)' : 'transparent',
        border: 'none'
      }}
    >
      {/* Active border indicator */}
      {active && (
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '3px',
            height: '24px',
            background: '#3B82F6',
            borderRadius: '0 2px 2px 0'
          }}
        />
      )}
      
      {/* Icon with proper sizing */}
      <Icon 
        style={{
          width: '18px',
          height: '18px',
          strokeWidth: active ? 2.5 : 2,
          color: active ? '#3B82F6' : '#71717A',
          flexShrink: 0,
          transition: 'color 0.2s ease'
        }}
      />
      
      {/* Label */}
      <span 
        style={{
          fontSize: '14px',
          fontWeight: active ? '600' : '500',
          color: active ? '#3B82F6' : '#A1A1AA',
          flex: 1,
          textAlign: 'left',
          transition: 'color 0.2s ease'
        }}
      >
        {label}
      </span>
    </button>
  );

  /**
   * Top navigation bar with exact specification implementation.
   */
  const TopBar = () => (
    <div 
      className="fixed top-0 z-50 flex items-center justify-between"
      style={{
        left: '200px',
        right: '0',
        height: '60px',
        background: 'linear-gradient(180deg, #0A0A0B 0%, #0F0F10 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0 24px'
      }}
    >
      {/* Logo Area - 240px width with right border */}
      <div 
        className="flex items-center justify-center"
        style={{
          width: 'var(--logo-width)',
          borderRight: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-display">Deal Estate</h2>
            <p className="text-sm text-gray-400 font-medium">Professional Edition</p>
          </div>
        </div>
      </div>

      {/* Search Bar - 480px width, 36px height */}
      <div className="flex-1 flex justify-center">
        <div 
          className="relative search-bar"
          style={{ 
            width: '400px',
            maxWidth: '100%'
          }}
        >
          <Search 
            className="absolute pointer-events-none"
            style={{ 
              width: '16px', 
              height: '16px',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#71717A',
              strokeWidth: 2
            }}
          />
          <input
            type="text"
            placeholder="Search properties, clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            style={{
              height: '36px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              paddingLeft: '40px',
              paddingRight: '16px',
              fontSize: '14px',
              color: '#E4E4E7',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4 pr-6">
        {/* Notifications */}
        <button className="relative p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group">
          <Bell 
            className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-200" 
          />
          {notifications.length > 0 && (
            <span 
              className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"
            ></span>
          )}
        </button>

        {/* User Avatar - 32px with 2px white border, online indicator */}
        <div className="relative">
          <div 
            className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-sm font-semibold shadow-md"
            style={{ border: '2px solid white' }}
          >
            {userProfile.name.charAt(0)}
          </div>
          {/* Online indicator - 8px green dot bottom-right */}
          <div 
            className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-black"
          ></div>
        </div>
      </div>
    </div>
  );

  /**
   * Login view with modern glass morphism design.
   */
  const LoginView = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-primary-50 p-4">
      <div className="max-w-md w-full animate-fade-in-up">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl shadow-2xl mb-6">
            <Building2 className="w-10 h-10 text-white" />
        </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary-900 to-primary-700 bg-clip-text text-transparent font-display">
            Deal Estate
          </h1>
          <p className="text-lg text-neutral-600 font-medium">
            Professional Industrial Real Estate Management
          </p>
        </div>

        {/* Login Form Card */}
        <div className="card-glass p-8 hover:shadow-2xl transition-all duration-500">
          <h2 className="text-2xl font-bold mb-8 text-center text-primary-900 font-display">
            Welcome Back
          </h2>

          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="input-enhanced focus-ring"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="input-enhanced focus-ring"
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="btn-primary w-full text-lg py-4 focus-ring ripple"
            >
              Sign In
            </button>
          </div>

          {/* Demo Credentials Hint */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <p className="text-sm text-neutral-600 text-center">
              <span className="font-medium">Demo Credentials:</span> admin / admin
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-neutral-500">
            Professional Edition • Secure & Reliable
          </p>
        </div>
      </div>
    </div>
  );

  /**
   * Dashboard view with exact KPI cards specification implementation.
   */
  const DashboardView = () => {
    const totalProperties = properties.length;
    const activeProperties = properties.filter(p => p.status === 'active').length;
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'active').length;
    const leasedClients = clients.filter(c => c.status === 'leased').length;
    const conversionRate = totalClients > 0 ? Math.round((leasedClients / totalClients) * 100) : 0;

    // Mock trend data for sparklines
    const trends = {
      properties: [2, 3, 4, 5, 6, 7],
      clients: [1, 2, 3, 4, 5, 6],
      inquiries: [3, 5, 8, 12, 15, 18]
    };

    return (
      <div className="w-full" style={{ padding: '24px', background: '#0A0A0B' }}>
        <div className="w-full">
          {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark-primary mb-2 font-display">Dashboard</h1>
            <p className="text-lg text-dark-muted">Welcome back! Here's what's happening with your properties.</p>
        </div>

          {/* Key Metrics Grid - 12 Column System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
              { 
                label: 'ACTIVE PROPERTIES', 
                value: activeProperties, 
                change: '+12%',
                icon: '📊',
                trend: 'up'
              },
              { 
                label: 'ACTIVE CLIENTS', 
                value: activeClients,
                change: '+8%', 
                icon: '👥',
                trend: 'up'
              },
              { 
                label: 'CONVERSION RATE', 
                value: `${conversionRate}%`,
                change: '+5%',
                icon: '📈',
                trend: 'neutral'
              },
              { 
                label: 'NOTIFICATIONS SENT', 
                value: notifications.length,
                change: '+23%',
                icon: '🔔',
                trend: 'up'
              }
            ].map((metric, index) => (
              <div key={index} className="premium-kpi slide-up" style={{
                background: 'linear-gradient(145deg, #1a1a1d, #16161a)',
                boxShadow: '20px 20px 60px #0a0a0c, -20px -20px 60px #202024, inset 1px 1px 2px rgba(255,255,255,0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '20px',
                minHeight: '140px',
                position: 'relative'
              }}>
                <div className="kpi-icon" style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(145deg, #2563eb, #1e40af)',
                  boxShadow: '5px 5px 10px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  marginBottom: '16px'
                }}>
                  {metric.icon}
                </div>
                
                <div className="kpi-value" style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #ffffff, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '8px'
                }}>
                  {metric.value}
                </div>
                
                <div className="kpi-label" style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#71717A',
                  opacity: '0.8'
                }}>
                  {metric.label}
                </div>
                
                <div className={`kpi-trend ${metric.trend === 'up' ? 'positive' : metric.trend === 'down' ? 'negative' : 'positive'}`} style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '4px 10px',
                  background: metric.trend === 'up' ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))' : 'linear-gradient(145deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
                  border: metric.trend === 'up' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: metric.trend === 'up' ? '#10b981' : '#ef4444',
                  backdropFilter: 'blur(10px)'
                }}>
                  {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} {metric.change}
                </div>
                
                <div className="kpi-sparkline">
                  <svg width="100%" height="24" viewBox="0 0 100 24">
                    <defs>
                      <linearGradient id={`kpi-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill={`url(#kpi-gradient-${index})`}
                      stroke="#3B82F6"
                      strokeWidth="2"
                      points="0,20 20,16 40,18 60,8 80,12 100,4 100,24 0,24"
                    />
                  </svg>
        </div>
              </div>
            ))}
          </div>

          {/* Content Grid - 12 Column System */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Properties - 8 columns */}
            <div className="lg:col-span-8">
              <div className="glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-dark-primary font-display">Recent Properties</h2>
                                    <button 
                    onClick={() => setCurrentView('properties')}
                    className="btn-premium"
                    style={{ padding: '10px 20px', fontSize: '14px' }}
                  >
                    View All
              </button>
            </div>
                <div className="space-y-4">
                  {properties.slice(0, 5).map((property) => (
                    <div key={property.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors duration-200">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{property.title}</h3>
                        <p className="text-sm text-gray-400">{property.city}, {property.state}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span>${property.price?.toLocaleString()}</span>
                          <span>{property.sqft?.toLocaleString()} sq ft</span>
                          <span className={`px-2 py-1 rounded-full ${
                            property.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {property.status}
                          </span>
                    </div>
                  </div>
                      <button 
                        onClick={() => { setSelectedProperty(property); setCurrentView('property-detail'); }}
                        className="btn btn-secondary text-sm py-2 px-3"
                      >
                        View
                      </button>
                </div>
              ))}
                  {properties.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                      <p>No properties added yet</p>
            </div>
                  )}
          </div>
              </div>
            </div>

            {/* Quick Actions & Stats - 4 columns */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Actions */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-dark-primary mb-4 font-display">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setCurrentView('add-property')}
                    className="w-full btn-premium justify-start"
                  >
                    <Plus className="w-4 h-4" />
                    Add Property
                  </button>
                                    <button 
                    onClick={() => setCurrentView('add-manual-client')}
                    className="w-full btn-premium justify-start"
                    style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(59, 130, 246, 0.3)' }}
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Client
                  </button>
                  <button 
                    onClick={() => setCurrentView('analytics')}
                    className="w-full btn-premium justify-start"
                    style={{ background: 'rgba(28, 28, 31, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  >
                    <TrendingUp className="w-4 h-4" />
                    View Analytics
              </button>
            </div>
              </div>

              {/* Recent Activity */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-dark-primary mb-4 font-display">Recent Activity</h3>
            <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Bell className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          Notification sent to {notification.clientName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(notification.timestamp).toLocaleDateString()}
                        </p>
                  </div>
                </div>
              ))}
                  {notifications.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">No recent activity</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Card summarising a numeric metric. Displays icon, value and trend.
   */
  const MetricCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="metric-card hover-lift group">
      <div className="flex items-center justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300">
          <Icon className="w-7 h-7 text-primary-600" />
        </div>
        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-success-50 text-success-700 border border-success-200">
          {trend}
        </span>
      </div>
      <h3 className="metric-value mb-2">{value}</h3>
      <p className="metric-label">{title}</p>
      
      {/* Subtle accent line */}
      <div className="mt-4 w-12 h-1 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
    </div>
  );

  /**
   * Properties view with modern design and improved layout.
   */
  const PropertiesView = () => {
    const filteredProperties = properties.filter((property) => {
      const matchesSearch = !searchQuery || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="p-6 bg-neutral-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary-900 mb-2 font-display">Properties</h1>
            <p className="text-lg text-neutral-600">Manage your industrial real estate portfolio</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200 bg-white shadow-sm"
                />
        </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200 bg-white shadow-sm"
              >
                <option value="all">All Status</option>
              <option value="active">Active</option>
                <option value="leased">Leased</option>
              <option value="archived">Archived</option>
            </select>
              
              <button
                onClick={() => setCurrentView('add-property')}
                className="btn-primary px-6 py-3 ripple"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Property
              </button>
          </div>
        </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => { setSelectedProperty(property); setCurrentView('property-detail'); }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
              <h3 className="text-lg font-semibold text-neutral-600 mb-2">No properties found</h3>
              <p className="text-neutral-500 mb-6">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Get started by adding your first property'
                }
              </p>
              {!searchQuery && filterStatus === 'all' && (
                <button
                  onClick={() => setCurrentView('add-property')}
                  className="btn-primary ripple"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Property
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  /**
   * Small card showing summary information for a property in a list.
   */
  const PropertyCard = ({ property, onClick }) => (
    <div className="premium-property slide-up" onClick={onClick}>
      <div className="property-image">
      {property.image ? (
          <img 
            src={property.image} 
            alt={property.title}
          />
      ) : (
          <div className="w-full h-full bg-dark-secondary flex items-center justify-center">
            <Building2 className="w-12 h-12 text-dark-muted" />
        </div>
      )}
        
        <div className="property-overlay" />
        
        <div className={`property-badge ${property.status}`}>
          {property.status.toUpperCase()}
        </div>
        
        <div className="property-actions">
          <button 
            onClick={(e) => { e.stopPropagation(); handleEditProperty(property); }}
            className="property-action-btn"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="property-action-btn"
          >
            <Eye size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleDeleteProperty(property.id); }}
            className="property-action-btn"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="property-content">
        <h3 className="property-title">
          {property.title}
        </h3>
        
        <div className="property-price">
          ${property.price?.toLocaleString()}
        </div>
        
        <div className="property-details">
          <div className="property-detail">
            <MapPin size={16} />
            {property.city}, {property.state}
          </div>
          {property.sqft && (
            <div className="property-detail">
              <Building2 size={16} />
              {property.sqft.toLocaleString()} sq ft
            </div>
          )}
        </div>
        
        <div className="property-buttons">
          <button 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="btn-property-primary"
          >
            View Details
          </button>
          <button className="btn-property-secondary">
            Schedule Tour
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * Detailed view of a single property. Shows stats and matching clients.
   */
  const PropertyDetailView = () => {
    if (!selectedProperty) return null;
    const matchingClientsForProperty = clients.filter((client) => criteriaMatches(selectedProperty, client.criteria));
    const activeMatchingClients = matchingClientsForProperty.filter((c) => c.status === 'active');
    const leasedMatchingClients = matchingClientsForProperty.filter((c) => c.status === 'leased');
    return (
      <div className="p-6">
        <button onClick={() => setCurrentView('properties')} className="mb-6 text-sm font-medium flex items-center gap-2 hover:opacity-80" style={{ color: colors.accent }}>
          ← Back to Properties
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {selectedProperty.image ? (
                <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-96 object-cover" />
              ) : (
                <div className="w-full h-96 flex items-center justify-center" style={{ backgroundColor: colors.background }}>
                  <Building2 className="w-24 h-24" style={{ color: colors.textSecondary }} />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>{selectedProperty.title}</h1>
                    <p className="text-lg flex items-center gap-2" style={{ color: colors.textSecondary }}>
                      <MapPin className="w-5 h-5" />
                      {selectedProperty.city}, {selectedProperty.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold" style={{ color: colors.accent }}>
                      ${selectedProperty.price.toLocaleString()}
                    </p>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      ${((selectedProperty.price || 0) / (selectedProperty.sqft || 1)).toFixed(2)}/sq ft
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Size</p>
                    <p className="font-semibold" style={{ color: colors.textPrimary }}>
                      {selectedProperty.sqft?.toLocaleString() || 'N/A'} sq ft
                    </p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Type</p>
                    <p className="font-semibold" style={{ color: colors.textPrimary }}>
                      {selectedProperty.property_type || 'N/A'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Loading Docks</p>
                    <p className="font-semibold" style={{ color: colors.textPrimary }}>
                      {selectedProperty.loading_docks || 'N/A'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Ceiling Height</p>
                    <p className="font-semibold" style={{ color: colors.textPrimary }}>
                      {selectedProperty.ceiling_height ? `${selectedProperty.ceiling_height} ft` : 'N/A'}
                    </p>
                  </div>
                </div>
                {selectedProperty.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3" style={{ color: colors.textPrimary }}>Description</h3>
                    <p style={{ color: colors.textSecondary }}>{selectedProperty.description}</p>
                  </div>
                )}
                <div className="flex gap-4">
                  <button onClick={() => handleArchiveProperty(selectedProperty.id)} className="px-4 py-2 rounded-lg font-medium border hover:bg-gray-50" style={{ borderColor: colors.border, color: colors.textPrimary }}>
                    <Archive className="w-4 h-4 inline mr-2" />
                    Archive
                  </button>
                  <button onClick={() => handleDeleteProperty(selectedProperty.id)} className="px-4 py-2 rounded-lg font-medium hover:opacity-80" style={{ backgroundColor: colors.danger, color: 'white' }}>
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Property Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span style={{ color: colors.textSecondary }}>Views</span>
                  <span className="font-semibold" style={{ color: colors.textPrimary }}>{selectedProperty.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: colors.textSecondary }}>Inquiries</span>
                  <span className="font-semibold" style={{ color: colors.textPrimary }}>{selectedProperty.inquiries}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: colors.textSecondary }}>Listed</span>
                  <span className="font-semibold" style={{ color: colors.textPrimary }}>{new Date(selectedProperty.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Matching Clients</h3>
              {matchingClientsForProperty.length === 0 ? (
                <p style={{ color: colors.textSecondary }}>No matching clients found</p>
              ) : (
                <div className="space-y-4">
                  {activeMatchingClients.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2" style={{ color: colors.success }}>
                        Active ({activeMatchingClients.length})
                      </p>
                      <div className="space-y-2">
                        {activeMatchingClients.map((client) => (
                          <div key={client.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedClient(client); setCurrentView('client-detail'); }}>
                            <p className="font-medium" style={{ color: colors.textPrimary }}>{client.name}</p>
                            <p className="text-sm" style={{ color: colors.textSecondary }}>{client.email}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {leasedMatchingClients.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2" style={{ color: colors.warning }}>
                        Leased ({leasedMatchingClients.length})
                      </p>
                      <div className="space-y-2">
                        {leasedMatchingClients.map((client) => {
                          const hasLeasedThis = client.leasedPropertyId === selectedProperty.id;
                          return (
                            <div key={client.id} className={`p-3 rounded-lg cursor-pointer ${hasLeasedThis ? 'bg-green-50 border-green-200' : 'bg-yellow-50'}`} style={{ borderWidth: hasLeasedThis ? '2px' : '0' }} onClick={() => { setSelectedClient(client); setCurrentView('client-detail'); }}>
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium" style={{ color: colors.textPrimary }}>{client.name}</p>
                                  <p className="text-sm" style={{ color: colors.textSecondary }}>{client.email}</p>
                                  {client.priceProtection && (
                                    <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                                      Protected: ${client.priceProtection.toLocaleString()}
                                    </p>
                                  )}
                                </div>
                                {hasLeasedThis && (
                                  <span className="flex items-center gap-1 text-xs font-medium text-green-800">
                                    <ShieldCheck className="w-4 h-4" />
                                    This property
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Clients view showing a table of all clients with filtering options.
   */
  const ClientsView = () => {
    const [clientFilter, setClientFilter] = useState('all');
    const filteredClients = clients.filter((client) => clientFilter === 'all' || client.status === clientFilter);
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>Clients</h1>
            <p style={{ color: colors.textSecondary }}>{filteredClients.length} {clientFilter !== 'all' ? clientFilter : ''} clients</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setCurrentView('add-manual-client')} className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:shadow-lg transition-all" style={{ backgroundColor: colors.accent }}>
              <UserPlus className="w-5 h-5" />
              Add Client
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
          <div className="flex items-center gap-4">
            <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)} className="px-4 py-2 rounded-lg border focus:outline-none" style={{ borderColor: colors.border }}>
              <option value="all">All Clients</option>
              <option value="active">Active</option>
              <option value="leased">Leased</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex gap-2 ml-auto">
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">Active: {clients.filter((c) => c.status === 'active').length}</span>
              <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">Leased: {clients.filter((c) => c.status === 'leased').length}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: colors.background }}>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: colors.textPrimary }}>Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: colors.textPrimary }}>Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: colors.textPrimary }}>Requirements</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: colors.textPrimary }}>Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: colors.textPrimary }}>Last Contact</th>
                <th className="px-6 py-4 text-right text-sm font-semibold" style={{ color: colors.textPrimary }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-t hover:bg-gray-50" style={{ borderColor: colors.border }}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium" style={{ color: colors.textPrimary }}>{client.name}</p>
                      {client.company && <p className="text-sm" style={{ color: colors.textSecondary }}>{client.company}</p>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm" style={{ color: colors.textPrimary }}>{client.email}</p>
                    {client.phone && <p className="text-sm" style={{ color: colors.textSecondary }}>{client.phone}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm" style={{ color: colors.textPrimary }}>
                      ${client.criteria.min_price?.toLocaleString() || '0'} - ${client.criteria.max_price?.toLocaleString() || 'Any'}
                    </p>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {client.criteria.city || 'Any city'}, {client.criteria.state || 'Any state'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      client.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : client.status === 'leased'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>{client.status}</span>
                    {client.priceProtection && (
                      <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                        Protected: ${client.priceProtection.toLocaleString()}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm" style={{ color: colors.textSecondary }}>{new Date(client.lastContact).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setSelectedClient(client); setCurrentView('client-detail'); }} className="text-sm font-medium hover:opacity-80" style={{ color: colors.accent }}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  /**
   * Form to add a manual client. Only basic details are required.
   */
  const AddManualClientView = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => setCurrentView('clients')} className="mb-6 text-sm font-medium flex items-center gap-2 hover:opacity-80" style={{ color: colors.accent }}>
        ← Back to Clients
      </button>
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Add New Client</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Name *</label>
            <input type="text" value={manualClientForm.name} onChange={(e) => setManualClientForm({ ...manualClientForm, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Company</label>
            <input type="text" value={manualClientForm.company} onChange={(e) => setManualClientForm({ ...manualClientForm, company: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Email</label>
            <input type="email" value={manualClientForm.email} onChange={(e) => setManualClientForm({ ...manualClientForm, email: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Phone</label>
            <input type="text" value={manualClientForm.phone} onChange={(e) => setManualClientForm({ ...manualClientForm, phone: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Source</label>
            <select value={manualClientForm.source} onChange={(e) => setManualClientForm({ ...manualClientForm, source: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }}>
              <option value="phone">Phone Call</option>
              <option value="email">Email</option>
              <option value="referral">Referral</option>
              <option value="walk-in">Walk-in</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>City</label>
            <input type="text" value={manualClientForm.city} onChange={(e) => setManualClientForm({ ...manualClientForm, city: e.target.value })} placeholder="Preferred city" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>State</label>
            <input type="text" value={manualClientForm.state} onChange={(e) => setManualClientForm({ ...manualClientForm, state: e.target.value })} placeholder="Preferred state" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>City</label>
            <input type="text" value={manualClientForm.city} onChange={(e) => setManualClientForm({ ...manualClientForm, city: e.target.value })} placeholder="Preferred city" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>State</label>
            <input type="text" value={manualClientForm.state} onChange={(e) => setManualClientForm({ ...manualClientForm, state: e.target.value })} placeholder="Preferred state" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Property Type</label>
            <input type="text" value={manualClientForm.property_type} onChange={(e) => setManualClientForm({ ...manualClientForm, property_type: e.target.value })} placeholder="e.g., Warehouse" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Min Budget</label>
            <input type="number" value={manualClientForm.min_price} onChange={(e) => setManualClientForm({ ...manualClientForm, min_price: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Max Budget</label>
            <input type="number" value={manualClientForm.max_price} onChange={(e) => setManualClientForm({ ...manualClientForm, max_price: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Loading Docks</label>
            <input type="number" value={manualClientForm.loading_docks} onChange={(e) => setManualClientForm({ ...manualClientForm, loading_docks: e.target.value })} placeholder="Minimum required" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Ceiling Height (ft)</label>
            <input type="number" value={manualClientForm.ceiling_height} onChange={(e) => setManualClientForm({ ...manualClientForm, ceiling_height: e.target.value })} placeholder="Minimum required" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Notes</label>
            <textarea value={manualClientForm.notes} onChange={(e) => setManualClientForm({ ...manualClientForm, notes: e.target.value })} rows={3} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
        </div>
        <div className="mt-8 flex gap-4">
          <button 
            onClick={handleAddClient} 
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg font-medium text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
            style={{ backgroundColor: colors.accent }}
          >
            {isSubmitting ? 'Adding Client...' : 'Add Client'}
          </button>
          <button onClick={() => setCurrentView('clients')} className="px-6 py-2 rounded-lg font-medium border hover:bg-gray-50" style={{ borderColor: colors.border, color: colors.textPrimary }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * Form to add new property with live matching preview.
   */
  const AddPropertyView = () => (
    <div className="p-6 max-w-6xl mx-auto">
      <button onClick={() => setCurrentView('properties')} className="mb-6 text-sm font-medium flex items-center gap-2 hover:opacity-80" style={{ color: colors.accent }}>
        ← Back to Properties
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Add New Property</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Property Title *</label>
                <input type="text" value={propertyForm.title} onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>City *</label>
                <input type="text" value={propertyForm.city} onChange={(e) => setPropertyForm({ ...propertyForm, city: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>State *</label>
                <input type="text" value={propertyForm.state} onChange={(e) => setPropertyForm({ ...propertyForm, state: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Price *</label>
                <input type="number" value={propertyForm.price} onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>City *</label>
                <input type="text" value={propertyForm.city} onChange={(e) => setPropertyForm({ ...propertyForm, city: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>State *</label>
                <input type="text" value={propertyForm.state} onChange={(e) => setPropertyForm({ ...propertyForm, state: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Property Type</label>
                <select value={propertyForm.property_type} onChange={(e) => setPropertyForm({ ...propertyForm, property_type: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }}>
                  <option value="">Select Type</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Distribution">Distribution Center</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Flex">Flex Space</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Square Footage</label>
                <input type="number" value={propertyForm.sqft} onChange={(e) => setPropertyForm({ ...propertyForm, sqft: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Year Built</label>
                <input type="text" value={propertyForm.year_built} onChange={(e) => setPropertyForm({ ...propertyForm, year_built: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Loading Docks</label>
                <input type="number" value={propertyForm.loading_docks} onChange={(e) => setPropertyForm({ ...propertyForm, loading_docks: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Ceiling Height (ft)</label>
                <input type="number" value={propertyForm.ceiling_height} onChange={(e) => setPropertyForm({ ...propertyForm, ceiling_height: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Zoning</label>
                <input type="text" value={propertyForm.zoning} onChange={(e) => setPropertyForm({ ...propertyForm, zoning: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Description</label>
                <textarea value={propertyForm.description} onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })} rows={4} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Property Image</label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: colors.border }}>
                  {propertyForm.image ? (
                    <div className="relative">
                      <img src={propertyForm.image} alt="Property" className="w-full h-64 object-cover rounded" />
                      <button onClick={() => setPropertyForm({ ...propertyForm, image: null })} className="absolute top-2 right-2 p-2 rounded-full shadow-lg" style={{ backgroundColor: colors.danger, color: 'white' }}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: colors.textSecondary }} />
                      <p className="font-medium mb-2" style={{ color: colors.textPrimary }}>Click to upload image</p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>PNG, JPG up to 10MB</p>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button onClick={handleAddProperty} className="px-6 py-2 rounded-lg font-medium text-white hover:shadow-lg transition-all" style={{ backgroundColor: colors.accent }}>
                Add Property & Notify Clients
              </button>
              <button onClick={() => setCurrentView('properties')} className="px-6 py-2 rounded-lg font-medium border hover:bg-gray-50" style={{ borderColor: colors.border, color: colors.textPrimary }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Matching Clients Preview</h3>
            {matchingClients.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-3" style={{ color: colors.textSecondary }} />
                <p style={{ color: colors.textSecondary }}>Fill in property details to see matching clients</p>
              </div>
            ) : (
              <div>
                <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: colors.success + '20' }}>
                  <p className="font-semibold" style={{ color: colors.success }}>{matchingClients.length} client(s) will be notified</p>
                </div>
                <div className="space-y-3">
                  {matchingClients.map((client) => (
                    <div key={client.id} className="p-3 rounded-lg border hover:shadow-sm transition-all" style={{ borderColor: colors.border }}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium" style={{ color: colors.textPrimary }}>{client.name}</p>
                          <p className="text-sm" style={{ color: colors.textSecondary }}>{client.email || client.phone}</p>
                          <div className="mt-2 text-xs" style={{ color: colors.textSecondary }}>
                            <p>Budget: ${client.criteria.min_price?.toLocaleString() || '0'} - ${client.criteria.max_price?.toLocaleString() || 'Any'}</p>
                            <p>Location: {client.criteria.city || 'Any'}, {client.criteria.state || 'Any'}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          client.status === 'active' ? 'bg-green-100 text-green-800' :
                          client.status === 'leased' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>{client.status}</span>
                      </div>
                      {client.priceProtection && parseFloat(propertyForm.price) < client.priceProtection && (
                        <div className="mt-2 p-2 rounded text-xs" style={{ backgroundColor: colors.warning + '20', color: colors.warning }}>
                          ⚠️ Price below their current lease (${client.priceProtection.toLocaleString()})
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Settings view where users can update profile and SMTP preferences.
   */
  const SettingsView = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8" style={{ color: colors.primary }}>Settings</h1>
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6" style={{ color: colors.textPrimary }}>Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Full Name</label>
            <input type="text" value={userProfile.name} onChange={(e) => handleUpdateProfile({ name: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Company</label>
            <input type="text" value={userProfile.company} onChange={(e) => handleUpdateProfile({ company: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Email</label>
            <input type="email" value={userProfile.email} onChange={(e) => handleUpdateProfile({ email: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Phone</label>
            <input type="text" value={userProfile.phone} onChange={(e) => handleUpdateProfile({ phone: e.target.value })} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>SMTP Configuration</h3>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={smtpEnabled} onChange={(e) => setSmtpEnabled(e.target.checked)} className="w-5 h-5 rounded" style={{ accentColor: colors.accent }} />
            <span style={{ color: colors.textPrimary }}>Enable SMTP Email Notifications</span>
          </label>
          {smtpEnabled && (
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
              <p className="text-sm" style={{ color: colors.textSecondary }}>SMTP is configured and active. Emails will be sent through your mail server.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /**
   * Billing view summarising plan details and billing history.
   */
  const BillingView = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8" style={{ color: colors.primary }}>Billing & Subscription</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>Current Plan</h3>
            <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: colors.accent + '20', color: colors.accent }}>Active</span>
          </div>
          <p className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>{userProfile.subscription}</p>
          <p className="mb-4" style={{ color: colors.textSecondary }}>$50/month</p>
          <button className="text-sm font-medium" style={{ color: colors.accent }}>Upgrade Plan →</button>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Payment Method</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-8 rounded flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
              <CreditCard className="w-6 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium" style={{ color: colors.textPrimary }}>•••• •••• •••• {userProfile.cardLast4}</p>
              <p className="text-sm" style={{ color: colors.textSecondary }}>Expires 12/24</p>
            </div>
          </div>
          <button className="text-sm font-medium" style={{ color: colors.accent }}>Update Payment Method →</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Billing History</h3>
        <div className="space-y-3">
          {[
            { date: '2024-01-15', amount: 50, status: 'Paid' },
            { date: '2023-12-15', amount: 50, status: 'Paid' },
            { date: '2023-11-15', amount: 50, status: 'Paid' }
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium" style={{ color: colors.textPrimary }}>${invoice.amount}.00</p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>{invoice.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium" style={{ color: colors.success }}>{invoice.status}</span>
                <button className="text-sm" style={{ color: colors.accent }}>Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /**
   * Shows the matching properties for a selected client and allows marking them as leased.
   */
  const ClientDetailView = () => {
    if (!selectedClient) return null;
    const matchingProperties = properties.filter((prop) => criteriaMatches(prop, selectedClient.criteria));
    return (
      <div className="p-6">
        <button onClick={() => setCurrentView('clients')} className="mb-6 text-sm font-medium flex items-center gap-2 hover:opacity-80" style={{ color: colors.accent }}>
          ← Back to Clients
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>{selectedClient.name}</h1>
                  {selectedClient.company && <p className="text-lg mb-2" style={{ color: colors.textSecondary }}>{selectedClient.company}</p>}
                  <div className="flex items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
                    {selectedClient.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedClient.email}
                      </span>
                    )}
                    {selectedClient.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedClient.phone}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingClient(selectedClient)} className="p-2 rounded-lg hover:bg-gray-100">
                    <Edit2 className="w-5 h-5" style={{ color: colors.textSecondary }} />
                  </button>
                  <button onClick={() => { if (confirm('Are you sure you want to delete this client?')) { setClients(clients.filter((c) => c.id !== selectedClient.id)); setCurrentView('clients'); } }} className="p-2 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-5 h-5" style={{ color: colors.danger }} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: colors.textPrimary }}>Search Criteria</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Budget Range</span>
                      <span style={{ color: colors.textPrimary }}>
                        ${selectedClient.criteria.min_price?.toLocaleString() || '0'} - ${selectedClient.criteria.max_price?.toLocaleString() || 'Any'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Location</span>
                      <span style={{ color: colors.textPrimary }}>
                        {selectedClient.criteria.city || 'Any city'}, {selectedClient.criteria.state || 'Any state'}
                      </span>
                    </div>
                    {selectedClient.criteria.property_type && (
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Property Type</span>
                        <span style={{ color: colors.textPrimary }}>{selectedClient.criteria.property_type}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: colors.textPrimary }}>Client Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: colors.textSecondary }}>Current Status</span>
                      <select
                        value={selectedClient.status}
                        onChange={(e) => handleUpdateClientStatus(selectedClient.id, e.target.value)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                          selectedClient.status === 'active'
                            ? 'bg-green-50 text-green-800 border-green-200'
                            : selectedClient.status === 'leased'
                              ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                              : 'bg-gray-50 text-gray-800 border-gray-200'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="leased">Leased</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    {selectedClient.status === 'leased' && selectedClient.leasedPropertyId && (
                      <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: colors.warning + '20' }}>
                        <p className="text-sm font-medium" style={{ color: colors.warning }}>Client has active lease</p>
                        {selectedClient.priceProtection && (
                          <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                            Price protection: ${selectedClient.priceProtection.toLocaleString()}
                          </p>
                        )}
                        {selectedClient.leaseStartDate && (
                          <p className="text-xs" style={{ color: colors.textSecondary }}>
                            Since: {new Date(selectedClient.leaseStartDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: colors.textSecondary }}>Last Contact</span>
                      <span className="text-sm" style={{ color: colors.textPrimary }}>{new Date(selectedClient.lastContact).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedClient.notes && (
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
                  <h3 className="font-semibold mb-2" style={{ color: colors.textPrimary }}>Notes</h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>{selectedClient.notes}</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Matching Properties ({matchingProperties.length})</h3>
              {matchingProperties.length === 0 ? (
                <p className="text-center py-8" style={{ color: colors.textSecondary }}>No matching properties found</p>
              ) : (
                <div className="space-y-3">
                  {matchingProperties.map((property) => (
                    <div key={property.id} className="p-3 rounded-lg border hover:shadow-sm transition-all relative" style={{ borderColor: colors.border }}>
                      {property.image && <img src={property.image} alt={property.title} className="w-full h-32 object-cover rounded mb-3" />}
                      <p className="font-medium" style={{ color: colors.textPrimary }}>{property.title}</p>
                      <p className="text-sm" style={{ color: colors.accent }}>${property.price.toLocaleString()}</p>
                      <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>{property.city}, {property.state}</p>
                      <div className="flex gap-2">
                        <button onClick={() => { setSelectedProperty(property); setCurrentView('property-detail'); }} className="flex-1 text-sm py-1 px-3 rounded border hover:bg-gray-50" style={{ borderColor: colors.border, color: colors.textPrimary }}>
                          View Details
                        </button>
                        {selectedClient.status === 'active' && (
                          <button onClick={() => handleLeaseProperty(selectedClient.id, property.id)} className="flex-1 text-sm py-1 px-3 rounded text-white" style={{ backgroundColor: colors.success }}>
                            Mark as Leased
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Notifications view shows all sent notifications with previews.
   */
  const NotificationsView = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8" style={{ color: colors.primary }}>Notifications</h1>
      <div className="bg-white rounded-xl shadow-sm">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 mx-auto mb-4" style={{ color: colors.textSecondary }} />
            <p style={{ color: colors.textSecondary }}>No notifications sent yet</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: colors.border }}>
            {notifications.map((notification) => (
              <div key={notification.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.method === 'SMTP Email' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <Mail className="w-5 h-5" style={{ color: notification.method === 'SMTP Email' ? colors.success : colors.warning }} />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: colors.textPrimary }}>{notification.clientName}</p>
                        <p className="text-sm" style={{ color: colors.textSecondary }}>{notification.client}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${notification.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{notification.status}</span>
                    </div>
                    {notification.method === 'SMTP Email' && notification.propertyImage && (
                      <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
                        <p className="text-sm font-medium mb-3" style={{ color: colors.textPrimary }}>Email Preview</p>
                        <div className="bg-white rounded-lg border p-4" style={{ borderColor: colors.border }}>
                          <p className="font-semibold mb-2" style={{ color: colors.textPrimary }}>Subject: {notification.subject}</p>
                          <img src={notification.propertyImage} alt="Property" className="w-full max-w-md h-48 object-cover rounded mb-3" />
                          <p className="text-sm" style={{ color: colors.textSecondary }}>{notification.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm whitespace-nowrap ml-4" style={{ color: colors.textSecondary }}>{new Date(notification.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  /**
   * Analytics view showing charts and insights.
   */
  const AnalyticsView = () => {
    const totalProperties = properties.length;
    const activeProperties = properties.filter(p => p.status === 'active').length;
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'active').length;
    const leasedClients = clients.filter(c => c.status === 'leased').length;
    const conversionRate = totalClients > 0 ? Math.round((leasedClients / totalClients) * 100) : 0;
    
    // Calculate monthly trends (mock data for now)
    const monthlyData = [
      { month: 'Jan', properties: 2, clients: 1, inquiries: 3 },
      { month: 'Feb', properties: 3, clients: 2, inquiries: 5 },
      { month: 'Mar', properties: 4, clients: 3, inquiries: 8 },
      { month: 'Apr', properties: 5, clients: 4, inquiries: 12 },
      { month: 'May', properties: 6, clients: 5, inquiries: 15 },
      { month: 'Jun', properties: 7, clients: 6, inquiries: 18 }
    ];

    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-neutral-800">Analytics</h1>
          <p className="text-neutral-600">Track your performance and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                Total
              </span>
            </div>
            <h3 className="metric-value">{totalProperties}</h3>
            <p className="metric-label">Properties</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700">
                Active
              </span>
            </div>
            <h3 className="metric-value">{activeClients}</h3>
            <p className="metric-label">Active Clients</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-700">
                {conversionRate}%
              </span>
            </div>
            <h3 className="metric-value">{conversionRate}%</h3>
            <p className="metric-label">Conversion Rate</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-700">
                Total
              </span>
            </div>
            <h3 className="metric-value">{notifications.length}</h3>
            <p className="metric-label">Notifications</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trends */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4 text-neutral-800">Monthly Trends</h3>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-neutral-600">{data.properties} properties</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-neutral-600">{data.clients} clients</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Status Distribution */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4 text-neutral-800">Property Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-600">Active Properties</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-3 bg-green-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${(activeProperties / totalProperties) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-neutral-800">{activeProperties}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-600">Archived Properties</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-3 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-neutral-500 rounded-full" 
                      style={{ width: `${((totalProperties - activeProperties) / totalProperties) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-neutral-800">{totalProperties - activeProperties}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4 text-neutral-800">Recent Activity</h3>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    Notification sent to {notification.clientName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  notification.status === 'Sent' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {notification.status}
                </span>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="text-center py-8 text-neutral-500">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Main layout including sidebar, topbar and content area.
   */
  const MainLayout = () => (
    <div className="flex min-h-screen" style={{ background: '#0A0A0B' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '200px', width: 'calc(100% - 200px)' }}>
        <TopBar />
        <div 
          className="flex-1 overflow-y-auto p-6"
          style={{ marginTop: '60px', maxWidth: '100%', width: '100%' }}
        >
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'properties' && <PropertiesView />}
          {currentView === 'property-detail' && <PropertyDetailView />}
          {currentView === 'add-property' && <AddPropertyView />}
          {currentView === 'clients' && <ClientsView />}
          {currentView === 'client-detail' && <ClientDetailView />}
          {currentView === 'add-manual-client' && <AddManualClientView />}
          {currentView === 'notifications' && <NotificationsView />}
          {currentView === 'analytics' && <AnalyticsView />}
          {currentView === 'settings' && <SettingsView />}
          {currentView === 'billing' && <BillingView />}
        </div>
      </div>
    </div>
  );

  // Render login or main layout based on authentication state
  return (
    <div className="min-h-screen bg-dark text-dark-secondary">
      {!isLoggedIn ? <LoginView /> : <MainLayout />}
    </div>
  );
};

export default IndustrialCRM;
