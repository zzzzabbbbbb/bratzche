name: Bratzche CI/CD

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js environment
        uses: actions/setup-node@v4.2
        with:
          node-version: '18.x'
          cache: 'npm'
          cache-dependency-path: 'package-lock.json'

      - name: Install Node.js dependencies
        run: npm install

      - name: Build Node.js application
        run: npm run build

      - name: Setup Swift environment
        run: sudo apt-get install -y clang libicu-dev swift

      - name: Build Swift application
        run: swift build

      - name: Run Swift tests
        run: swift test

      - name: Deploy to production
        run: npm run deploy
