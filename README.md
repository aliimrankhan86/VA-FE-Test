# Virgin Atlantic / Virgin Atlantic Holidays ~ Holiday Search Results 

Project Overview

Introduction

I wanted to provide an overview of the approach I took to complete the test for the recent Next.js project, particularly regarding the search component.

Initially, I wrote the test using Jest, unaware of the existing Cypress setup until I was almost finished. Given the time constraints and progress made, I continued with the Jest framework.

Components Overview

1. Search Component:
    - Server Component:
        - This component is responsible for fetching data. By utilizing React server components, we ensure efficient data retrieval and handling.
    - Client Component:
        - This component is a standard React client component used to display the fetched data. It allows for a dynamic and responsive user interface.

2. Filtering Components:
    - Manage Component:
        - This component manages the state and logic for filtering the data.
    - Search Filter Component:
        - This component is responsible for rendering the filter UI and handling user interactions.
    - Overlay:
        - An overlay component was included to enhance the user experience by providing a clear and intuitive filtering interface.

Running Tests and Starting the Application

- Running Tests:
    - To run the tests, you can execute: `yarn test`
- Starting the Application:
    - To start the application, you can execute: `yarn run dev`

This setup provides a clear separation of concerns, ensuring that data fetching, state management, and UI rendering are handled efficiently and maintainably.

If there are any questions or further clarifications needed, please feel free to reach out.



