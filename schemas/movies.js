const z = require('zod');

const movieSchema = z.object({
  title: z.string({ invalid_type_error: 'Movie title must be a string', required_error: 'Movie title is required' }),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url().endsWith('.webp'),
  genre: z.array(
    z.enum(['Action', 'Crime', 'Drama', 'Adventure', 'Sci-Fi', 'Romance', 'Animation', 'Biography', 'Fantasy'])
  )
});

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}

function validateMovie(input) {
  return movieSchema.safeParse(input);
}

module.exports = {
  validateMovie,
  validatePartialMovie
};
