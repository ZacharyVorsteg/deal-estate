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
    min_price: '', max_price: '', city: '', state: '', property_type: '', status: 'active'
  });

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
  const handleAddProperty = () => {
    if (!propertyForm.title || !propertyForm.city || !propertyForm.state || !propertyForm.price) {
      alert('Please fill in all required fields');
      return;
    }
    const newProperty = {
      id: Date.now(),
      title: propertyForm.title,
      city: propertyForm.city,
      state: propertyForm.state,
      price: parseFloat(propertyForm.price),
      property_type: propertyForm.property_type,
      loading_docks: propertyForm.loading_docks ? parseInt(propertyForm.loading_docks) : null,
      ceiling_height: propertyForm.ceiling_height ? parseInt(propertyForm.ceiling_height) : null,
      sqft: propertyForm.sqft ? parseInt(propertyForm.sqft) : null,
      year_built: propertyForm.year_built,
      zoning: propertyForm.zoning,
      description: propertyForm.description,
      image: propertyForm.image,
      status: 'active',
      created_at: new Date().toISOString(),
      views: 0,
      inquiries: 0
    };
    setProperties([...properties, newProperty]);
    // Notify matching clients
    const activeMatchingClients = matchingClients.filter((client) => client.status === 'active');
    activeMatchingClients.forEach((client) => {
      sendNotification(client, newProperty);
    });
    alert(`Property added successfully! ${activeMatchingClients.length} active client(s) notified.`);
    // Reset form
    setPropertyForm({
      title: '', city: '', state: '', price: '', property_type: '', loading_docks: '',
      ceiling_height: '', image: null, sqft: '', year_built: '', zoning: '', description: ''
    });
    setMatchingClients([]);
    setCurrentView('properties');
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
    if (confirm('Are you sure you want to archive this property?')) {
      setProperties(properties.map((prop) => (prop.id === propertyId ? { ...prop, status: 'archived' } : prop)));
      alert('Property archived successfully!');
    }
  };

  /**
   * Permanently deletes a property from the list. Use carefully.
   */
  const handleDeleteProperty = (propertyId) => {
    if (confirm('Are you sure you want to permanently delete this property?')) {
      setProperties(properties.filter((prop) => prop.id !== propertyId));
      alert('Property deleted successfully!');
    }
  };

  /**
   * Updates the user profile with provided changes.
   */
  const handleUpdateProfile = (updates) => {
    setUserProfile({ ...userProfile, ...updates });
    alert('Profile updated successfully!');
  };

  /**
   * Marks a property as leased by a client. Updates the client status to
   * "leased" and records the lease history. Also sets price protection.
   */
  const handleLeaseProperty = (clientId, propertyId) => {
    const property = properties.find((p) => p.id === propertyId);
    const client = clients.find((c) => c.id === clientId);
    if (!property || !client) return;
    const confirmMessage = `Mark ${client.name} as having leased "${property.title}" for ${property.price.toLocaleString()}?\n\nThis will:\n• Stop notifications for cheaper properties\n• Change their status to "Leased"\n• Track this lease in the system`;
    if (confirm(confirmMessage)) {
      setClients(
        clients.map((c) =>
          c.id === clientId
            ? {
                ...c,
                status: 'leased',
                leasedPropertyId: propertyId,
                leaseStartDate: new Date().toISOString(),
                priceProtection: property.price
              }
            : c
        )
      );
      const leaseRecord = {
        id: Date.now(),
        clientId,
        clientName: client.name,
        propertyId,
        propertyTitle: property.title,
        price: property.price,
        leaseDate: new Date().toISOString()
      };
      setLeaseHistory([...leaseHistory, leaseRecord]);
      alert(
        `${client.name} has been marked as leased. They won't receive notifications for properties under ${property.price.toLocaleString()}`
      );
    }
  };

  /**
   * Toggles a client's status between active, leased and inactive. Handles
   * resetting lease info when going back to active.
   */
  const handleToggleClientStatus = (clientId, newStatus) => {
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;
    let confirmMessage = `Change ${client.name}'s status to "${newStatus}"?`;
    if (newStatus === 'active' && client.status === 'leased') {
      confirmMessage += '\n\nThis will resume property notifications for this client.';
    } else if (newStatus === 'leased') {
      confirmMessage += '\n\nThis will pause notifications. Use this when they sign a lease.';
    } else if (newStatus === 'inactive') {
      confirmMessage += '\n\nThis will stop all notifications and mark them as inactive.';
    }
    if (confirm(confirmMessage)) {
      setClients(
        clients.map((c) =>
          c.id === clientId
            ? {
                ...c,
                status: newStatus,
                leasedPropertyId: newStatus === 'active' ? null : c.leasedPropertyId,
                priceProtection: newStatus === 'active' ? null : c.priceProtection
              }
            : c
        )
      );
      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient({ ...selectedClient, status: newStatus });
      }
      alert(`Status updated to "${newStatus}"`);
    }
  };

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
   * Sidebar component listing navigation options. Collapsible on mobile.
   */
  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${
        showMobileMenu ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b" style={{ borderColor: colors.border }}>
          <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>Deal Estate</h2>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
            Professional Edition
          </p>
        </div>
        <nav className="flex-1 p-4">
          <SidebarItem icon={Home} label="Dashboard" active={currentView === 'dashboard'} onClick={() => { setCurrentView('dashboard'); setShowMobileMenu(false); }} />
          <SidebarItem icon={Building2} label="Properties" active={currentView === 'properties'} onClick={() => { setCurrentView('properties'); setShowMobileMenu(false); }} />
          <SidebarItem icon={Users} label="Clients" active={currentView === 'clients'} onClick={() => { setCurrentView('clients'); setShowMobileMenu(false); }} />
          <SidebarItem icon={Bell} label="Notifications" active={currentView === 'notifications'} onClick={() => { setCurrentView('notifications'); setShowMobileMenu(false); }} />
          <SidebarItem icon={TrendingUp} label="Analytics" active={currentView === 'analytics'} onClick={() => { setCurrentView('analytics'); setShowMobileMenu(false); }} />
          <div className="mt-8 pt-8 border-t" style={{ borderColor: colors.border }}>
            <SidebarItem icon={Settings} label="Settings" active={currentView === 'settings'} onClick={() => { setCurrentView('settings'); setShowMobileMenu(false); }} />
            <SidebarItem icon={CreditCard} label="Billing" active={currentView === 'billing'} onClick={() => { setCurrentView('billing'); setShowMobileMenu(false); }} />
          </div>
        </nav>
        <div className="p-4 border-t" style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent, color: 'white' }}>
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: colors.textPrimary }}>{userProfile.name}</p>
              <p className="text-xs" style={{ color: colors.textSecondary }}>{userProfile.company}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: colors.danger }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * Reusable sidebar item. Highlights if active.
   */
  const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-all ${active ? 'shadow-sm' : 'hover:bg-gray-50'}`}
      style={{ backgroundColor: active ? colors.accent : 'transparent', color: active ? 'white' : colors.textPrimary }}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  /**
   * Top bar with search and notifications. Collapsible menu on mobile.
   */
  const TopBar = () => (
    <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden">
        <Menu className="w-6 h-6" style={{ color: colors.textPrimary }} />
      </button>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textSecondary }} />
          <input
            type="text"
            placeholder="Search properties, clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{ borderColor: colors.border }}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell className="w-5 h-5" style={{ color: colors.textSecondary }} />
          {notifications.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: colors.danger }} />}
        </button>
      </div>
    </div>
  );

  /**
   * Login screen. For proof-of-concept the credentials are hard-coded but any
   * input will work.
   */
  const LoginView = () => (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>Deal Estate</h1>
          <p style={{ color: colors.textSecondary }}>Professional Industrial Real Estate Management</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Welcome Back</h2>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: colors.border }}
              />
            </div>
            <button onClick={handleLogin} className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all hover:shadow-lg" style={{ backgroundColor: colors.accent }}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Dashboard view summarising key metrics and recent activity.
   */
  const DashboardView = () => {
    const activeProperties = properties.filter((p) => p.status === 'active').length;
    const activeClients = clients.filter((c) => c.status === 'active').length;
    const leasedClients = clients.filter((c) => c.status === 'leased').length;
    const recentNotifications = notifications.slice(0, 5);
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>Dashboard</h1>
          <p style={{ color: colors.textSecondary }}>Welcome back, {userProfile.name}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Active Properties" value={activeProperties} icon={Building2} trend="+12%" color={colors.accent} />
          <MetricCard title="Active Clients" value={activeClients} icon={Users} trend={`${leasedClients} leased`} color={colors.success} />
          <MetricCard title="Notifications Sent" value={notifications.length} icon={Bell} trend="+23%" color={colors.warning} />
          <MetricCard
            title="Conversion Rate"
            value={leasedClients > 0 ? Math.round((leasedClients / (activeClients + leasedClients)) * 100) + '%' : '0%'}
            icon={TrendingUp}
            trend="leased/total"
            color={colors.primary}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>Recent Properties</h2>
              <button onClick={() => setCurrentView('add-property')} className="text-sm font-medium flex items-center gap-2 hover:opacity-80" style={{ color: colors.accent }}>
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>
            <div className="space-y-3">
              {properties.slice(0, 3).map((property) => (
                <div key={property.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedProperty(property); setCurrentView('property-detail'); }}>
                  <div className="flex items-center gap-3">
                    {property.image ? (
                      <img src={property.image} alt={property.title} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.background }}>
                        <Building2 className="w-6 h-6" style={{ color: colors.textSecondary }} />
                      </div>
                    )}
                    <div>
                      <p className="font-medium" style={{ color: colors.textPrimary }}>{property.title}</p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>{property.city}, {property.state}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" style={{ color: colors.textSecondary }} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>Recent Activity</h2>
              <button onClick={() => setCurrentView('notifications')} className="text-sm font-medium hover:opacity-80" style={{ color: colors.accent }}>
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.success + '20' }}>
                    <Mail className="w-4 h-4" style={{ color: colors.success }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>Notification sent to {notification.clientName}</p>
                    <p className="text-xs truncate" style={{ color: colors.textSecondary }}>Property: {notification.property}</p>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: colors.textSecondary }}>
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
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
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <span className="text-sm font-medium" style={{ color: colors.success }}>{trend}</span>
      </div>
      <h3 className="text-2xl font-bold mb-1" style={{ color: colors.textPrimary }}>{value}</h3>
      <p className="text-sm" style={{ color: colors.textSecondary }}>{title}</p>
    </div>
  );

  /**
   * Displays a list of properties. Supports filtering by status.
   */
  const PropertiesView = () => {
    const filteredProperties = properties.filter((p) => filterStatus === 'all' || p.status === filterStatus);
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>Properties</h1>
            <p style={{ color: colors.textSecondary }}>{filteredProperties.length} total properties</p>
          </div>
          <button onClick={() => setCurrentView('add-property')} className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:shadow-lg transition-all" style={{ backgroundColor: colors.accent }}>
            <Plus className="w-5 h-5" />
            Add Property
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
          <div className="flex items-center gap-4">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 rounded-lg border focus:outline-none" style={{ borderColor: colors.border }}>
              <option value="all">All Properties</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} onClick={() => { setSelectedProperty(property); setCurrentView('property-detail'); }} />
          ))}
        </div>
      </div>
    );
  };

  /**
   * Small card showing summary information for a property in a list.
   */
  const PropertyCard = ({ property, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer">
      {property.image ? (
        <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 flex items-center justify-center" style={{ backgroundColor: colors.background }}>
          <Building2 className="w-12 h-12" style={{ color: colors.textSecondary }} />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>{property.title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{property.status}</span>
        </div>
        <p className="text-2xl font-bold mb-3" style={{ color: colors.accent }}>
          ${property.price.toLocaleString()}
        </p>
        <div className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {property.city}, {property.state}
          </p>
          {property.sqft && (
            <p className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {property.sqft.toLocaleString()} sq ft
            </p>
          )}
        </div>
        <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm" style={{ borderColor: colors.border, color: colors.textSecondary }}>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {property.views} views
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            {property.inquiries} inquiries
          </span>
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>Notes</label>
            <textarea value={manualClientForm.notes} onChange={(e) => setManualClientForm({ ...manualClientForm, notes: e.target.value })} rows={3} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2" style={{ borderColor: colors.border }} />
          </div>
        </div>
        <div className="mt-8 flex gap-4">
          <button onClick={handleAddManualClient} className="px-6 py-2 rounded-lg font-medium text-white hover:shadow-lg transition-all" style={{ backgroundColor: colors.accent }}>
            Add Client
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
                        onChange={(e) => handleToggleClientStatus(selectedClient.id, e.target.value)}
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
   * Main layout including sidebar, topbar and content area.
   */
  const MainLayout = () => (
    <div className="flex h-screen" style={{ backgroundColor: colors.background }}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'properties' && <PropertiesView />}
          {currentView === 'property-detail' && <PropertyDetailView />}
          {currentView === 'add-property' && <AddPropertyView />}
          {currentView === 'clients' && <ClientsView />}
          {currentView === 'client-detail' && <ClientDetailView />}
          {currentView === 'add-manual-client' && <AddManualClientView />}
          {currentView === 'notifications' && <NotificationsView />}
          {currentView === 'settings' && <SettingsView />}
          {currentView === 'billing' && <BillingView />}
        </div>
      </div>
    </div>
  );

  // Render login or main layout based on authentication state
  return <div className="min-h-screen" style={{ backgroundColor: colors.background }}>{!isLoggedIn ? <LoginView /> : <MainLayout />}</div>;
};

export default IndustrialCRM;
