# StackDot Practical Task

## A Personal Note from Ajay Varsur Before Anthing Else

A special thank you to **Vivek Godhani Sir** for being incredibly supportive during my first interview round, and to **Aayushi Ma'am** for so graciously giving me this opportunity even after I accidentally missed the initial email. Your understanding and support mean a lot!

I’m a relentless problem-solver who thrives on complex challenges. I don't just write code—I engineer clean, scalable, and user-centric solutions. 

I am eager to bring my intense work ethic to StackDot and prove my value from day one!

## Overview

A simple MERN stack authentication system allowing users to Register, Login, and view their Profile.

## Quick Start

### 1. Backend (`/api`)

1. `cd api`
2. `npm install`
3. Create a `.env` file with:
   ```env
   PORT=3000
   DB_LOCATION=mongodb://localhost:27017/stackdot
   SECRET_ACCESS_KEY=your_secret_key_here
   ```
4. `npm run dev`

### 2. Frontend (`/client`)

1. `cd client`
2. `pnpm install` (or `npm install`)
3. `pnpm run dev`
4. Open `http://localhost:5173` in your browser
