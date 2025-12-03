/**
 * SQL Builder with Tag Function - SQLite Example
 * Demonstrates safe SQL query building using template literals
 */

import sqlite3 from 'sqlite3';

// SQL Tag Function
interface SQLQuery {
  text: string;
  values: any[];
}

function sql(strings: TemplateStringsArray, ...values: any[]): SQLQuery {
  const text = strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? `?` : '');
  }, '');
  
  return {
    text: text.trim(),
    values: values
  };
}

// Database wrapper with promisified methods
class Database {
  private db: sqlite3.Database;
  
  constructor(filename: string) {
    this.db = new sqlite3.Database(filename);
  }
  
  run(query: SQLQuery): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(query.text, query.values, function(err: Error | null) {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  get(query: SQLQuery): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(query.text, query.values, (err: Error | null, row: any) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
  
  all(query: SQLQuery): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(query.text, query.values, (err: Error | null, rows: any[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
  
  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err: Error | null) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

// Trivia data
interface TriviaQuestion {
  category: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const triviaData: TriviaQuestion[] = [
  {
    category: 'Science',
    question: 'What is the speed of light in vacuum?',
    answer: '299,792,458 meters per second',
    difficulty: 'medium'
  },
  {
    category: 'Geography',
    question: 'What is the capital of Australia?',
    answer: 'Canberra',
    difficulty: 'easy'
  },
  {
    category: 'History',
    question: 'In which year did World War II end?',
    answer: '1945',
    difficulty: 'easy'
  },
  {
    category: 'Technology',
    question: 'Who is considered the father of computer science?',
    answer: 'Alan Turing',
    difficulty: 'medium'
  },
  {
    category: 'Mathematics',
    question: 'What is the value of Euler\'s number (e) to 2 decimal places?',
    answer: '2.72',
    difficulty: 'hard'
  },
  {
    category: 'Literature',
    question: 'Who wrote "1984"?',
    answer: 'George Orwell',
    difficulty: 'easy'
  },
  {
    category: 'Science',
    question: 'What is the atomic number of carbon?',
    answer: '6',
    difficulty: 'medium'
  },
  {
    category: 'Geography',
    question: 'Which river is the longest in the world?',
    answer: 'Nile River',
    difficulty: 'medium'
  },
  {
    category: 'Technology',
    question: 'What does SQL stand for?',
    answer: 'Structured Query Language',
    difficulty: 'easy'
  },
  {
    category: 'History',
    question: 'Who was the first person to walk on the moon?',
    answer: 'Neil Armstrong',
    difficulty: 'easy'
  }
];

// Main function
async function main() {
  const db = new Database(':memory:'); // In-memory database for demo
  
  try {
    console.log('📚 SQL Builder Tag Function Demo\n');
    
    // Create table
    console.log('Creating trivia table...');
    const createTableQuery = sql`
      CREATE TABLE trivia (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Query:', createTableQuery.text);
    await db.run(createTableQuery);
    console.log('✓ Table created\n');
    
    // Insert trivia questions
    console.log('Inserting trivia questions...');
    for (const trivia of triviaData) {
      const insertQuery = sql`
        INSERT INTO trivia (category, question, answer, difficulty)
        VALUES (${trivia.category}, ${trivia.question}, ${trivia.answer}, ${trivia.difficulty})
      `;
      
      await db.run(insertQuery);
    }
    console.log(`✓ Inserted ${triviaData.length} trivia questions\n`);
    
    // Query: Get all trivia
    console.log('📋 All Trivia Questions:');
    console.log('─'.repeat(80));
    const allTrivia = sql`SELECT * FROM trivia ORDER BY category, difficulty`;
    const allResults = await db.all(allTrivia);
    
    allResults.forEach((row: any) => {
      console.log(`[${row.difficulty.toUpperCase()}] ${row.category}: ${row.question}`);
      console.log(`   Answer: ${row.answer}`);
      console.log();
    });
    
    // Query: Filter by category
    console.log('\n🔬 Science Trivia:');
    console.log('─'.repeat(80));
    const category = 'Science';
    const scienceQuery = sql`
      SELECT * FROM trivia 
      WHERE category = ${category}
      ORDER BY difficulty
    `;
    
    const scienceResults = await db.all(scienceQuery);
    scienceResults.forEach((row: any) => {
      console.log(`Q: ${row.question}`);
      console.log(`A: ${row.answer} [${row.difficulty}]`);
      console.log();
    });
    
    // Query: Filter by difficulty
    console.log('\n🎯 Hard Questions:');
    console.log('─'.repeat(80));
    const difficulty = 'hard';
    const hardQuery = sql`
      SELECT * FROM trivia 
      WHERE difficulty = ${difficulty}
    `;
    
    const hardResults = await db.all(hardQuery);
    hardResults.forEach((row: any) => {
      console.log(`[${row.category}] ${row.question}`);
      console.log(`Answer: ${row.answer}`);
      console.log();
    });
    
    // Query: Count by category
    console.log('\n📊 Statistics by Category:');
    console.log('─'.repeat(80));
    const statsQuery = sql`
      SELECT 
        category,
        COUNT(*) as count,
        GROUP_CONCAT(difficulty) as difficulties
      FROM trivia
      GROUP BY category
      ORDER BY count DESC
    `;
    
    const stats = await db.all(statsQuery);
    stats.forEach((row: any) => {
      console.log(`${row.category}: ${row.count} question(s)`);
    });
    
    // Query: Search with LIKE
    console.log('\n\n🔍 Search for "computer" or "technology":');
    console.log('─'.repeat(80));
    const searchTerm = '%computer%';
    const searchQuery = sql`
      SELECT * FROM trivia 
      WHERE question LIKE ${searchTerm} 
         OR answer LIKE ${searchTerm}
         OR category LIKE ${searchTerm}
    `;
    
    const searchResults = await db.all(searchQuery);
    searchResults.forEach((row: any) => {
      console.log(`Q: ${row.question}`);
      console.log(`A: ${row.answer}`);
      console.log();
    });
    
    // Update example
    console.log('\n📝 Updating a question...');
    const questionId = 1;
    const newDifficulty = 'hard';
    const updateQuery = sql`
      UPDATE trivia 
      SET difficulty = ${newDifficulty}
      WHERE id = ${questionId}
    `;
    
    await db.run(updateQuery);
    console.log(`✓ Updated question #${questionId} to difficulty: ${newDifficulty}`);
    
    // Verify update
    const verifyQuery = sql`SELECT * FROM trivia WHERE id = ${questionId}`;
    const updated = await db.get(verifyQuery);
    console.log(`  Question: ${updated.question}`);
    console.log(`  New difficulty: ${updated.difficulty}\n`);
    
    // Delete example
    console.log('🗑️  Deleting easy questions...');
    const deleteQuery = sql`DELETE FROM trivia WHERE difficulty = ${'easy'}`;
    await db.run(deleteQuery);
    
    // Count remaining
    const countQuery = sql`SELECT COUNT(*) as total FROM trivia`;
    const countResult = await db.get(countQuery);
    console.log(`✓ Remaining questions: ${countResult.total}\n`);
    
    // Final summary
    console.log('\n📈 Final Summary:');
    console.log('─'.repeat(80));
    const summaryQuery = sql`
      SELECT 
        difficulty,
        COUNT(*) as count
      FROM trivia
      GROUP BY difficulty
      ORDER BY 
        CASE difficulty
          WHEN 'easy' THEN 1
          WHEN 'medium' THEN 2
          WHEN 'hard' THEN 3
        END
    `;
    
    const summary = await db.all(summaryQuery);
    summary.forEach((row: any) => {
      const bar = '█'.repeat(row.count);
      console.log(`${row.difficulty.padEnd(10)} ${bar} ${row.count}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await db.close();
    console.log('\n✓ Database connection closed');
  }
}

main().catch(console.error);
