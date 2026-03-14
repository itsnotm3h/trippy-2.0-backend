import bcrypt from 'bcrypt';

const saltRounds = 10; // The 'work factor' - higher is more secure but slower
const plainPassword = '1';

// Asynchronous hashing
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);


console.log(hashedPassword);