# Deal Estate CRM

A modern, industrial real estate CRM built with React and Supabase, designed for property managers and real estate professionals.

## 🚀 Features

- **Property Management**: Track industrial properties with detailed specifications
- **Client Management**: Manage client relationships and property criteria
- **Email Integration**: SendGrid integration for automated communications
- **Image Management**: Cloudinary integration for property photos
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Supabase real-time database functionality

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Email**: SendGrid
- **Image Storage**: Cloudinary
- **Forms**: React Hook Form + Yup validation
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 16+ 
- pnpm (recommended) or npm
- Supabase account and project
- SendGrid account (optional)
- Cloudinary account (optional)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZacharyVorsteg/deal-estate.git
   cd deal-estate
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_SENDGRID_API_KEY=your_sendgrid_api_key
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

4. **Start development server**
   ```bash
   pnpm start
   ```

5. **Build for production**
   ```bash
   pnpm build
   ```

## 🗄️ Database Setup

The application uses Supabase. You'll need to create the following tables:

### Properties Table
```sql
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  city TEXT,
  state TEXT,
  price DECIMAL,
  property_type TEXT,
  loading_docks INTEGER,
  ceiling_height DECIMAL,
  sqft INTEGER,
  year_built INTEGER,
  zoning TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Clients Table
```sql
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  source TEXT,
  notes TEXT,
  min_price DECIMAL,
  max_price DECIMAL,
  city TEXT,
  state TEXT,
  property_type TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Set build command: `pnpm build`
4. Set publish directory: `build`

### Manual Deployment
1. Run `pnpm build`
2. Upload the `build` folder to your web server
3. Configure your server to serve the React app

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Enable Row Level Security (RLS)
3. Set up authentication policies
4. Configure real-time subscriptions

### SendGrid Setup
1. Create a SendGrid account
2. Generate an API key
3. Verify your sender domain

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name
3. Create an upload preset

## 📱 Usage

1. **Login**: Use admin/admin for development
2. **Properties**: Add and manage industrial properties
3. **Clients**: Track client information and property criteria
4. **Dashboard**: Monitor property and client statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

## 🔄 Updates

- **v1.0.0**: Initial release with core CRM functionality
- **v0.1.0**: Development version with basic features
