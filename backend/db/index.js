const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');

// Database configuration - adjust as needed
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'your_database',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function runSqlFile(filePath) {
  try {
    console.log(`Running: ${path.basename(filePath)}`);
    const sql = await fs.readFile(filePath, 'utf8');
    
    // Split on semicolons and filter out empty statements
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
      }
    }
    
    console.log(`✅ Completed: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Error in ${path.basename(filePath)}:`, error.message);
    throw error;
  }
}

async function runFolder(folderPath, description) {
  try {
    console.log(`\n🚀 Running ${description}...`);
    
    // Check if folder exists
    try {
      await fs.access(folderPath);
    } catch {
      console.log(`📁 ${folderPath} folder not found, skipping...`);
      return;
    }
    
    // Read all .sql files and sort them
    const files = await fs.readdir(folderPath);
    const sqlFiles = files
      .filter(file => file.endsWith('.sql'))
      .sort(); // Alphabetical order - use numbered prefixes like 001_create_users.sql
    
    if (sqlFiles.length === 0) {
      console.log(`📁 No .sql files found in ${folderPath}`);
      return;
    }
    
    // Run each file in order
    for (const file of sqlFiles) {
      const filePath = path.join(folderPath, file);
      await runSqlFile(filePath);
    }
    
    console.log(`✅ ${description} completed!`);
  } catch (error) {
    console.error(`❌ Failed during ${description}:`, error.message);
    throw error;
  }
}

async function runMigrationsAndSeeds() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Starting database setup...');
    
    // Run migrations first
    await runFolder('./migrations', 'migrations');
    
    // Then run seeds
    await runFolder('./seeds', 'seeds');
    
    console.log('\n🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('\n💥 Database setup failed:', error.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Export for use in other files, or run directly
if (require.main === module) {
  runMigrationsAndSeeds();
}

module.exports = { runMigrationsAndSeeds, runFolder, runSqlFile };