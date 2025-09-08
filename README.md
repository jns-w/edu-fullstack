# Edu Fullstack

Demo: [Link](https://edu-fullstack.vercel.app)

## Technology Stack

> #### Frontend
> - Next.js
> - SASS
> - React Markdown
> #### Backend
> - Node.js
> - Express
> - PostgreSQL
> - Drizzle ORM
> - JWT

The Edu Fullstack project leverages a robust and modern technology stack to deliver a seamless educational platform. The frontend is built with Next.js, SASS, and React Markdown, while the backend utilizes Node.js, Express, PostgreSQL, and Drizzle ORM, with JWT for authentication.

### Frontend

The frontend is powered by Next.js, which benefits from strong community support and a rich ecosystem, making it ideal for rapid prototyping and development. Hosted on Vercel, it ensures fast and efficient deployment, streamlining the development process. Next.js's file-based routing provides an intuitive and efficient structure, a standard increasingly adopted by other open-source projects like React Native. Styling is handled by SASS and CSS Variables, offering high flexibility and robust theming capabilities. The platform is designed to be fully responsive, adapting seamlessly from standard laptop displays to tablet sizes, ensuring accessibility across devices. React Markdown is employed to parse educational content on the frontend, leveraging the markdown format’s simplicity and flexibility, which is particularly suitable for enabling instructors to create and manage their own content efficiently.

### Backend

The backend is built on Node.js, a mature and stable platform with an extensive library ecosystem, ensuring reliability and scalability. PostgreSQL serves as the database, chosen for its robustness and rich feature set, including full-text search capabilities critical for educational content platforms. Drizzle ORM, paired with Drizzle Kit, facilitates agile development through efficient migration tools, making it well-suited for prototyping and iterative development. Authentication is implemented using JWT, with environment files securing sensitive data like JWT secrets, ensuring a lean yet secure prototype that demonstrates core authentication concepts.

## API Design Philosophy

The API is designed with a forward-thinking versioning structure to ensure future-proofing. This approach maintains the stability of the current v1 APIs while allowing flexibility for developing v2 APIs without disrupting existing functionality. This structure supports long-term scalability and adaptability as the platform evolves.

## Performance & Scalability

To address performance and scalability, the project incorporates optimizations like Next.js’s caching capabilities. For instance, on the course page (`edu-frontend/app/course/page.tsx`), data is cached with a revalidation interval of 30 seconds, significantly reducing server load during high-traffic periods. However, current bottlenecks include the lack of server and database redundancy. To handle increased traffic and data loads, implementing load balancers for multiple servers and database clones with snapshots is essential for ensuring data redundancy and system reliability.

## Integration Strategy

Security is prioritized through robust authentication and data protection measures. Passwords are encrypted using bcrypt, and JWT is employed for secure authentication, with secrets stored in environment files. This lean prototype showcases my understanding of authentication principles while maintaining simplicity. API keys and user data are handled with care to ensure security, aligning with best practices for a scalable educational platform.

## Critical Analysis

### Strengths

The Edu Fullstack project establishes a solid foundation for a scalable and feature-rich educational platform. The carefully selected technology stack proved highly effective, with no significant bottlenecks or roadblocks encountered during development. The overall structure and setup reflect thoughtful planning, positioning the project as a strong base for future growth and refinement.

### Limitations

Currently, route naming relies on database primary keys, a lean approach suitable for the prototyping phase where course materials are not finalized. For production, adopting descriptive route names (e.g., `https://edufullstack.io/dsa/algorithms`) would enhance user experience and SEO. Time constraints prevented the frontend integration of some backend features, such as the dictionary (`edu-backend/src/services/dictionary.services.ts`) and search functionality (`edu-backend/src/services/search.services.ts`), which are included to demonstrate progress. Error handling has not been prioritized at this stage due to the project’s nascent development and concurrent feature work. As features stabilize, centralized and standardized error handling should be implemented at the project level. With additional time and resources, the project has the potential to evolve into an outstanding educational platform through further refinement and polish.