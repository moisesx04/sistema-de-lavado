
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * SQL SCHEMA (To be run in Supabase SQL Editor):
 * 
 * -- Enable UUID
 * create extension if not exists "uuid-ossp";
 * 
 * -- Washers Table
 * create table washers (
 *   id uuid primary key default uuid_generate_v4(),
 *   name text not null,
 *   phone text,
 *   created_at timestamp with time zone default timezone('utc'::text, now())
 * );
 * 
 * -- Services Table
 * create table services (
 *   id uuid primary key default uuid_generate_v4(),
 *   name text not null,
 *   client_price numeric not null,
 *   washer_pay numeric not null
 * );
 * 
 * -- Records (Washes) Table
 * create table wash_records (
 *   id uuid primary key default uuid_generate_v4(),
 *   washer_id uuid references washers(id) on delete cascade,
 *   service_id uuid references services(id) on delete cascade,
 *   client_price numeric not null,
 *   washer_pay numeric not null,
 *   created_at timestamp with time zone default timezone('utc'::text, now())
 * );
 */
