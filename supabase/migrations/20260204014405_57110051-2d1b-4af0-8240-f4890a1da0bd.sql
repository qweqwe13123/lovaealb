-- Alter rental_applications table with all new fields
ALTER TABLE public.rental_applications
ADD COLUMN IF NOT EXISTS is_us_citizen boolean,
ADD COLUMN IF NOT EXISTS ssn_encrypted text,
ADD COLUMN IF NOT EXISTS government_id_type text,
ADD COLUMN IF NOT EXISTS government_id_files text[],
ADD COLUMN IF NOT EXISTS additional_occupants jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS current_date_moved_in date,
ADD COLUMN IF NOT EXISTS current_monthly_rent numeric,
ADD COLUMN IF NOT EXISTS current_reason_leaving text,
ADD COLUMN IF NOT EXISTS current_landlord_name text,
ADD COLUMN IF NOT EXISTS current_landlord_phone text,
ADD COLUMN IF NOT EXISTS current_landlord_email text,
ADD COLUMN IF NOT EXISTS previous_address text,
ADD COLUMN IF NOT EXISTS previous_city text,
ADD COLUMN IF NOT EXISTS previous_state text,
ADD COLUMN IF NOT EXISTS previous_zip text,
ADD COLUMN IF NOT EXISTS previous_date_moved_in date,
ADD COLUMN IF NOT EXISTS previous_date_moved_out date,
ADD COLUMN IF NOT EXISTS previous_monthly_rent numeric,
ADD COLUMN IF NOT EXISTS previous_reason_leaving text,
ADD COLUMN IF NOT EXISTS previous_landlord_name text,
ADD COLUMN IF NOT EXISTS employment_status text,
ADD COLUMN IF NOT EXISTS job_title text,
ADD COLUMN IF NOT EXISTS supervisor_name text,
ADD COLUMN IF NOT EXISTS employment_start_date date,
ADD COLUMN IF NOT EXISTS gross_monthly_income numeric,
ADD COLUMN IF NOT EXISTS other_income_source text,
ADD COLUMN IF NOT EXISTS other_income_amount numeric,
ADD COLUMN IF NOT EXISTS screening_sued_for_rent boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS screening_sued_for_rent_explain text,
ADD COLUMN IF NOT EXISTS screening_sued_for_damages boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS screening_sued_for_damages_explain text,
ADD COLUMN IF NOT EXISTS screening_evicted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS screening_evicted_explain text,
ADD COLUMN IF NOT EXISTS screening_defaulted_lease boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS screening_defaulted_lease_explain text,
ADD COLUMN IF NOT EXISTS screening_judgment boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS screening_judgment_explain text,
ADD COLUMN IF NOT EXISTS screening_bankruptcy boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS screening_bankruptcy_explain text,
ADD COLUMN IF NOT EXISTS screening_felony boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS screening_felony_explain text,
ADD COLUMN IF NOT EXISTS has_pets boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS pets_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS pets_data jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS pets_caused_damage boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS pets_damage_explain text,
ADD COLUMN IF NOT EXISTS emergency_first_name text,
ADD COLUMN IF NOT EXISTS emergency_last_name text,
ADD COLUMN IF NOT EXISTS emergency_relationship text,
ADD COLUMN IF NOT EXISTS emergency_phone text,
ADD COLUMN IF NOT EXISTS emergency_email text,
ADD COLUMN IF NOT EXISTS emergency_has_access boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS has_vehicle boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS vehicles jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS certification_true_info boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS certification_verify_info boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS certification_background_check boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS certification_false_info_denial boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS certification_non_refundable boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS certification_terms boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS adults_count integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS total_fee_amount numeric,
ADD COLUMN IF NOT EXISTS confirmation_number text UNIQUE;

-- Create function to generate unique confirmation number
CREATE OR REPLACE FUNCTION generate_confirmation_number()
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_number text;
  year_part text;
  seq_part text;
  counter integer;
BEGIN
  year_part := to_char(now(), 'YYYY');
  
  -- Get the count of applications this year and add 1
  SELECT COUNT(*) + 1 INTO counter 
  FROM rental_applications 
  WHERE confirmation_number LIKE 'APP-' || year_part || '-%';
  
  seq_part := lpad(counter::text, 6, '0');
  new_number := 'APP-' || year_part || '-' || seq_part;
  
  RETURN new_number;
END;
$$;

-- Create trigger to auto-generate confirmation number on insert
CREATE OR REPLACE FUNCTION set_confirmation_number()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.confirmation_number IS NULL THEN
    NEW.confirmation_number := generate_confirmation_number();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_set_confirmation_number ON rental_applications;
CREATE TRIGGER trigger_set_confirmation_number
BEFORE INSERT ON rental_applications
FOR EACH ROW
EXECUTE FUNCTION set_confirmation_number();

-- Create storage bucket for ID documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for application documents
CREATE POLICY "Anyone can upload application documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'application-documents');

CREATE POLICY "Service role can read application documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'application-documents');