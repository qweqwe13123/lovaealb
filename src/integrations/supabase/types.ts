export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      rental_applications: {
        Row: {
          additional_info: string | null
          additional_occupants: Json | null
          adults_count: number | null
          annual_income: number | null
          application_fee_paid: boolean | null
          certification_background_check: boolean | null
          certification_false_info_denial: boolean | null
          certification_non_refundable: boolean | null
          certification_terms: boolean | null
          certification_true_info: boolean | null
          certification_verify_info: boolean | null
          confirmation_number: string | null
          created_at: string
          current_address: string | null
          current_city: string | null
          current_date_moved_in: string | null
          current_landlord_email: string | null
          current_landlord_name: string | null
          current_landlord_phone: string | null
          current_monthly_rent: number | null
          current_reason_leaving: string | null
          current_state: string | null
          current_zip: string | null
          date_of_birth: string | null
          desired_floor_plan: string | null
          email: string
          emergency_email: string | null
          emergency_first_name: string | null
          emergency_has_access: boolean | null
          emergency_last_name: string | null
          emergency_phone: string | null
          emergency_relationship: string | null
          employer_name: string | null
          employer_phone: string | null
          employment_start_date: string | null
          employment_status: string | null
          first_name: string
          government_id_files: string[] | null
          government_id_type: string | null
          gross_monthly_income: number | null
          has_pets: boolean | null
          has_vehicle: boolean | null
          id: string
          is_us_citizen: boolean | null
          job_title: string | null
          last_name: string
          move_in_date: string | null
          other_income_amount: number | null
          other_income_source: string | null
          payment_status: string | null
          pets: string | null
          pets_caused_damage: boolean | null
          pets_count: number | null
          pets_damage_explain: string | null
          pets_data: Json | null
          phone: string | null
          previous_address: string | null
          previous_city: string | null
          previous_date_moved_in: string | null
          previous_date_moved_out: string | null
          previous_landlord_name: string | null
          previous_monthly_rent: number | null
          previous_reason_leaving: string | null
          previous_state: string | null
          previous_zip: string | null
          screening_bankruptcy: boolean | null
          screening_bankruptcy_explain: string | null
          screening_defaulted_lease: boolean | null
          screening_defaulted_lease_explain: string | null
          screening_evicted: boolean | null
          screening_evicted_explain: string | null
          screening_felony: boolean | null
          screening_felony_explain: string | null
          screening_judgment: boolean | null
          screening_judgment_explain: string | null
          screening_sued_for_damages: boolean | null
          screening_sued_for_damages_explain: string | null
          screening_sued_for_rent: boolean | null
          screening_sued_for_rent_explain: string | null
          ssn_encrypted: string | null
          stripe_payment_intent_id: string | null
          supervisor_name: string | null
          total_fee_amount: number | null
          updated_at: string
          vehicles: Json | null
        }
        Insert: {
          additional_info?: string | null
          additional_occupants?: Json | null
          adults_count?: number | null
          annual_income?: number | null
          application_fee_paid?: boolean | null
          certification_background_check?: boolean | null
          certification_false_info_denial?: boolean | null
          certification_non_refundable?: boolean | null
          certification_terms?: boolean | null
          certification_true_info?: boolean | null
          certification_verify_info?: boolean | null
          confirmation_number?: string | null
          created_at?: string
          current_address?: string | null
          current_city?: string | null
          current_date_moved_in?: string | null
          current_landlord_email?: string | null
          current_landlord_name?: string | null
          current_landlord_phone?: string | null
          current_monthly_rent?: number | null
          current_reason_leaving?: string | null
          current_state?: string | null
          current_zip?: string | null
          date_of_birth?: string | null
          desired_floor_plan?: string | null
          email: string
          emergency_email?: string | null
          emergency_first_name?: string | null
          emergency_has_access?: boolean | null
          emergency_last_name?: string | null
          emergency_phone?: string | null
          emergency_relationship?: string | null
          employer_name?: string | null
          employer_phone?: string | null
          employment_start_date?: string | null
          employment_status?: string | null
          first_name: string
          government_id_files?: string[] | null
          government_id_type?: string | null
          gross_monthly_income?: number | null
          has_pets?: boolean | null
          has_vehicle?: boolean | null
          id?: string
          is_us_citizen?: boolean | null
          job_title?: string | null
          last_name: string
          move_in_date?: string | null
          other_income_amount?: number | null
          other_income_source?: string | null
          payment_status?: string | null
          pets?: string | null
          pets_caused_damage?: boolean | null
          pets_count?: number | null
          pets_damage_explain?: string | null
          pets_data?: Json | null
          phone?: string | null
          previous_address?: string | null
          previous_city?: string | null
          previous_date_moved_in?: string | null
          previous_date_moved_out?: string | null
          previous_landlord_name?: string | null
          previous_monthly_rent?: number | null
          previous_reason_leaving?: string | null
          previous_state?: string | null
          previous_zip?: string | null
          screening_bankruptcy?: boolean | null
          screening_bankruptcy_explain?: string | null
          screening_defaulted_lease?: boolean | null
          screening_defaulted_lease_explain?: string | null
          screening_evicted?: boolean | null
          screening_evicted_explain?: string | null
          screening_felony?: boolean | null
          screening_felony_explain?: string | null
          screening_judgment?: boolean | null
          screening_judgment_explain?: string | null
          screening_sued_for_damages?: boolean | null
          screening_sued_for_damages_explain?: string | null
          screening_sued_for_rent?: boolean | null
          screening_sued_for_rent_explain?: string | null
          ssn_encrypted?: string | null
          stripe_payment_intent_id?: string | null
          supervisor_name?: string | null
          total_fee_amount?: number | null
          updated_at?: string
          vehicles?: Json | null
        }
        Update: {
          additional_info?: string | null
          additional_occupants?: Json | null
          adults_count?: number | null
          annual_income?: number | null
          application_fee_paid?: boolean | null
          certification_background_check?: boolean | null
          certification_false_info_denial?: boolean | null
          certification_non_refundable?: boolean | null
          certification_terms?: boolean | null
          certification_true_info?: boolean | null
          certification_verify_info?: boolean | null
          confirmation_number?: string | null
          created_at?: string
          current_address?: string | null
          current_city?: string | null
          current_date_moved_in?: string | null
          current_landlord_email?: string | null
          current_landlord_name?: string | null
          current_landlord_phone?: string | null
          current_monthly_rent?: number | null
          current_reason_leaving?: string | null
          current_state?: string | null
          current_zip?: string | null
          date_of_birth?: string | null
          desired_floor_plan?: string | null
          email?: string
          emergency_email?: string | null
          emergency_first_name?: string | null
          emergency_has_access?: boolean | null
          emergency_last_name?: string | null
          emergency_phone?: string | null
          emergency_relationship?: string | null
          employer_name?: string | null
          employer_phone?: string | null
          employment_start_date?: string | null
          employment_status?: string | null
          first_name?: string
          government_id_files?: string[] | null
          government_id_type?: string | null
          gross_monthly_income?: number | null
          has_pets?: boolean | null
          has_vehicle?: boolean | null
          id?: string
          is_us_citizen?: boolean | null
          job_title?: string | null
          last_name?: string
          move_in_date?: string | null
          other_income_amount?: number | null
          other_income_source?: string | null
          payment_status?: string | null
          pets?: string | null
          pets_caused_damage?: boolean | null
          pets_count?: number | null
          pets_damage_explain?: string | null
          pets_data?: Json | null
          phone?: string | null
          previous_address?: string | null
          previous_city?: string | null
          previous_date_moved_in?: string | null
          previous_date_moved_out?: string | null
          previous_landlord_name?: string | null
          previous_monthly_rent?: number | null
          previous_reason_leaving?: string | null
          previous_state?: string | null
          previous_zip?: string | null
          screening_bankruptcy?: boolean | null
          screening_bankruptcy_explain?: string | null
          screening_defaulted_lease?: boolean | null
          screening_defaulted_lease_explain?: string | null
          screening_evicted?: boolean | null
          screening_evicted_explain?: string | null
          screening_felony?: boolean | null
          screening_felony_explain?: string | null
          screening_judgment?: boolean | null
          screening_judgment_explain?: string | null
          screening_sued_for_damages?: boolean | null
          screening_sued_for_damages_explain?: string | null
          screening_sued_for_rent?: boolean | null
          screening_sued_for_rent_explain?: string | null
          ssn_encrypted?: string | null
          stripe_payment_intent_id?: string | null
          supervisor_name?: string | null
          total_fee_amount?: number | null
          updated_at?: string
          vehicles?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
