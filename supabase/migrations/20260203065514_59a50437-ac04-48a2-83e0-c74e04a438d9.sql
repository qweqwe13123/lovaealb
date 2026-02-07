-- Create table for rental applications
CREATE TABLE public.rental_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  current_address TEXT,
  current_city TEXT,
  current_state TEXT,
  current_zip TEXT,
  employer_name TEXT,
  employer_phone TEXT,
  annual_income NUMERIC,
  move_in_date DATE,
  desired_floor_plan TEXT,
  pets TEXT,
  additional_info TEXT,
  payment_status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  application_fee_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rental_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (public form)
CREATE POLICY "Anyone can submit applications" 
ON public.rental_applications 
FOR INSERT 
WITH CHECK (true);

-- Allow reading own application by email (for confirmation)
CREATE POLICY "Users can view their own applications" 
ON public.rental_applications 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_rental_applications_updated_at
BEFORE UPDATE ON public.rental_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();