-- Drop existing function and trigger
DROP TRIGGER IF EXISTS set_confirmation_number_trigger ON public.rental_applications;
DROP FUNCTION IF EXISTS public.generate_confirmation_number();

-- Create new function that generates XXXX-XXXX format (8 hex chars with hyphen)
CREATE OR REPLACE FUNCTION public.generate_confirmation_number()
RETURNS TRIGGER AS $$
DECLARE
  new_confirmation TEXT;
  chars TEXT := 'ABCDEF0123456789';
  i INTEGER;
  part1 TEXT := '';
  part2 TEXT := '';
BEGIN
  -- Generate unique confirmation number in format XXXX-XXXX
  LOOP
    part1 := '';
    part2 := '';
    
    -- Generate first 4 characters
    FOR i IN 1..4 LOOP
      part1 := part1 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    
    -- Generate second 4 characters
    FOR i IN 1..4 LOOP
      part2 := part2 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    
    new_confirmation := part1 || '-' || part2;
    
    -- Check if this confirmation number already exists
    IF NOT EXISTS (SELECT 1 FROM public.rental_applications WHERE confirmation_number = new_confirmation) THEN
      EXIT;
    END IF;
  END LOOP;
  
  NEW.confirmation_number := new_confirmation;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger
CREATE TRIGGER set_confirmation_number_trigger
  BEFORE INSERT ON public.rental_applications
  FOR EACH ROW
  WHEN (NEW.confirmation_number IS NULL)
  EXECUTE FUNCTION public.generate_confirmation_number();