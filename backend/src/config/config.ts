const { PORT, JWT_SECRET, BUN_ENV, DATABASE_URL } = process.env;

// Validate required environment variables
if (!JWT_SECRET) {
    console.error(' JWT_SECRET environment variable is required');
    process.exit(1);
}

if (!DATABASE_URL) {
    console.error(' DATABASE_URL environment variable is required');
    process.exit(1);
}

export default {
    PORT: PORT ? parseInt(PORT, 10) : undefined,
    JWT_SECRET,
    BUN_ENV,
    DATABASE_URL,
}