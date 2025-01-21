# Next.js Project Documentation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Step 1: Set Up Supabase

To integrate Supabase into your project:

1. Go to the [Supabase website](https://supabase.com/) and create a new account or log in.
2. Create a new project by providing the required details such as project name, database password, and region.
3. After the project is created, navigate to the **API** section in the Supabase dashboard. Note down the `Project URL` and `anon` key, as these will be used in your Next.js project.
4. Configure environment variables in your project. Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
   Replace `your_project_url` and `your_anon_key` with the actual values from the Supabase dashboard.

### Prisma

This section quickly shows how to connect your Prisma application to Supabase Postgres. If you encounter any problems, reference the Prisma troubleshooting docs.

If you plan to solely use Prisma instead of the Supabase Data API (PostgREST), turn it off in the **API Settings**.

#### 1. Create a Custom User for Prisma

1. In the SQL Editor, create a Prisma db-user with full privileges on the public schema. This gives you better control over Prisma's access and makes it easier to monitor using Supabase tools like the Query Performance Dashboard and Log Explorer.

2. For security, consider using a password generator for the Prisma role.

   ```sql
   -- Create custom user
   create user "prisma" with password 'custom_password' bypassrls createdb;

   -- Extend prisma's privileges to postgres (necessary to view changes in Dashboard)
   grant "prisma" to "postgres";

   -- Grant it necessary permissions over the relevant schemas (public)
   grant usage on schema public to prisma;
   grant create on schema public to prisma;
   grant all on all tables in schema public to prisma;
   grant all on all routines in schema public to prisma;
   grant all on all sequences in schema public to prisma;
   alter default privileges for role postgres in schema public grant all on tables to prisma;
   alter default privileges for role postgres in schema public grant all on routines to prisma;
   alter default privileges for role postgres in schema public grant all on sequences to prisma;

   -- Alter prisma password if needed
   alter user "prisma" with password 'new_password';
   ```

#### 2. Add Your Connection Information to Your .env File

1. Visit the Database Settings in the Supabase dashboard.
2. Find your Supavisor Session Mode string. It should end with `5432`. It will be used in your `.env` file.
   
   If you're in an IPv6 environment or have the IPv4 Add-On, you can use the direct connection string instead of Supavisor in Session mode.

3. If you plan on deploying Prisma to a serverless or auto-scaling environment, you'll also need your Supavisor transaction mode string. The string is identical to the session mode string but uses port `6543` at the end.

4. Assign the connection string for Supavisor Transaction Mode (using port `6543`) to the `DATABASE_URL` variable in your `.env` file. Make sure to append `pgbouncer=true` to the end of the string to work with Supavisor.

5. Next, create a `DIRECT_URL` variable in your `.env` file and assign the connection string that ends with port `5432` to it.

   ```env
   DATABASE_URL="postgres://[DB-USER].[PROJECT-REF]:[PRISMA-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

   # Used for Prisma Migrations (use session mode or direct connection)
   DIRECT_URL="postgres://[DB-USER].[PROJECT-REF]:[PRISMA-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
   ```

   Change both your strings' `[DB-USER]` to `prisma` and then add the password created in step 1.

### Step 2: Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Step 3: Set Up Prisma

Prisma is used as the ORM for interacting with the database. To initialize Prisma and apply migrations:

1. Run the following command to create the initial migration and apply it to your database:
   ```bash
   npx prisma migrate dev
   ```
   This will prompt you to name your migration. Provide an appropriate name and press Enter.

2. Prisma will generate the necessary files and apply the schema to your database.

3. Ensure that the `prisma/schema.prisma` file is configured correctly for your Supabase database.

### Step 4: Run the Development Server

Start the development server by running:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

