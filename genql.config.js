module.exports = {
  endpoint: 'https://admin.adcc.sa/graphql',
  output: './lib/generated',
  // Optional: Add headers if authentication is required
  headers: {
    // 'Authorization': 'Bearer YOUR_TOKEN'
  },
  // Generate both TypeScript types and JavaScript client
  generateTs: true,
  // Enable React hooks generation (optional)
  react: false,
  // Additional options
  scalar: {
    Date: 'string',
    DateTime: 'string',
    JSON: 'any',
  }
}