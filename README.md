# Zuriportfolio - Frontend

This is a `Nextjs, Typescript and Tailwindcss` project.

## Getting Started

This project uses `yarn workspaces` as default monorepo architecture.

#### First clone the repo

```bash
git clone https://github.com/hngx-org/zuriportfolio-frontend.git
```

#### Install all dependencies

```bash
yarn install
```

#### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Types

As you know by now that this is a typescript based project. Please all types must be created separately in the `type` or `@types` directly outside of the componentss folder. If your components require a custom type, create them inside a folder called `types` or `@types` and export it to be used somewhere else.

# Commit Standards

## Branches

- **dev** -> pr this branch for everything `frontend` related
- **main** -> **dont touch** this branch, this is what is running in production.

## Contributions

zuriportfolio is open to contributions, but I recommend creating an issue or replying in a comment to let us know what you are working on first that way we don't overwrite each other.

## Contribution Guidelines

1. Clone the repo `git clone https://github.com/hngx-org/zuriportfolio-frontend.git`.
2. Open your terminal & set the origin branch: `git remote add origin https://github.com/hngx-org/zuriportfolio-frontend.git.web.git`
3. Pull origin `git pull origin dev`
4. Create a new branch for the task you were assigned to, eg `TicketNumber/(Feat/Bug/Fix/Chore)/Ticket-title` : `git checkout -b ZA-001/Feat/Sign-Up-from`
5. After making changes, do `git add .`
6. Commit your changes with a descriptive commit message : `git commit -m "your commit message"`.
7. To make sure there are no conflicts, run `git pull origin dev`.
8. Push changes to your new branch, run `git push -u origin ZA-001/Feat/Sign-Up-from`.
9. Create a pull request to the `dev` branch not `main`.
10. Ensure to describe your pull request.
11. > If you've added code that should be tested, add some test examples.

# Merging

Under any circumstances should you merge a pull requests on a specific branch to the `dev` or `main` branch

### _Commit CheatSheet_

| Type     |                          | Description                                                                                                 |
| -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| feat     | Features                 | A new feature                                                                                               |
| fix      | Bug Fixes                | A bug fix                                                                                                   |
| docs     | Documentation            | Documentation only changes                                                                                  |
| style    | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| refactor | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |
| perf     | Performance Improvements | A code change that improves performance                                                                     |
| test     | Tests                    | Adding missing tests or correcting existing tests                                                           |
| build    | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| ci       | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore    | Chores                   | Other changes that don't modify , frontend or test files                                                    |
| revert   | Reverts                  | Reverts a previous commit                                                                                   |

> _Sample Commit Messages_

- `chore: Updated README file` := `chore` is used because the commit didn't make any changes to the , frontend or test folders in any way.
- `feat: Added plugin info endpoints` := `feat` is used here because the feature was non-existent before the commit.

## Code Explanation

### API Calls

A separate folder called `http` which contains `axios.ts` and `index.ts` files where created to handle any outgoing or incoming http request/response. the `index.ts` file should contain all outgoing `API` calls to the backend server.

> ❗❗Do not create any custom http calls inside a page or components. Whatever calls that need to be processed by the server should be called within the `index.ts` file.

### Custom Authentication Handler

Within the `helpers` folder contains **two** different files called `withAuth.tsx` and `withoutAuth.tsx`.

- **WithAuth.tsx** :- is a `HOF` function which wraps every components that needs protection or protected route components. for eg `Dashboard` or any other page that require the user to be loggedIn. All you have to do is import the cusstom handler and wrap your component inside it. i.e

```js
withAuth(Dashboard);
withAuth(Promotion);
```

- **WithoutAuth.tsx** :- is the opposite of `withAuth.tsx` HOF. It only meant to be used to prevent loggedIn users from redirecting or navigating to a page. i.e when a user is loggedIn and you dont want them to view a certain page, use this function.

```js
withoutAuth(Login);
withoutAuth(Signup);
```

### MainLayout.tsx

Within this file contains a `MainLayout` component, rather than calling `Footer`, `Sidebar`, `TopBar` component on every file manually, all you have to do is first invoke the `<MainLayout>` component inside any page before adding the children of that page.

for eg

```js
import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';

function Home() {
  return (
    <MainLayout activePage="home" showDashboardSidebar showTopbar>
      <p className="text-dark-100">Home Page</p>
    </MainLayout>
  );
}

export default Home;
```

you also get to decide whether to show the footer or sidebar using the available props.
