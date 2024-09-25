/**
 * Path: scr/features/profile/
 * This script automates the creation of a new React component with associated files.
 * It generates the following files for the specified component:
 * - A TypeScript component file (.tsx)
 * - A SCSS module file (.settings.module.scss)
 * - An index file for exporting the component
 * - A Storybook story file (.stories.tsx)
 *
 * The script takes three command-line arguments:
 * 1. `folderName` - The name of the folder where the component will be created.
 * 2. `componentName` - The name of the component to be created.
 * 3. `upperCase` - A boolean flag indicating whether the component name should be capitalized, by default false
 *
 * Usage:
 * ```
 * node script.js <folderName> <componentName> <upperCase>
 * pnpm comp <folderName> <componentName> true?
 * ```
 *
 * Example:
 * ```
 * node script.js auth Test true
 * pnpm comp ui test true
 * ```
 *
 * The script also updates the main index file in the specified folder to include an export for the new component.
 * It formats and lints the created files using `pnpm` commands.
 */

import { exec } from 'child_process'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import path from 'path'

/* eslint-disable no-console */

/**
 * Creates a new component with associated files.
 * @param {string} folderName - The name of the folder to create the component in.
 * @param {string} componentName - The name of the component to create.
 */

async function createComponent(folderName, componentName) {
  const capitalizedName = capitalizeFirstLetter(componentName, Boolean(upperCase))
  const capitalizedNameForce = capitalizeFirstLetter(componentName, true)

  const dirPath = `./src/features/profile/${folderName}/${capitalizedName}`
  const componentPath = path.join(dirPath, `${capitalizedName}.tsx`)
  const componentContent =
  `import clsx from 'clsx'

  import styles from './${capitalizedName}.module.scss'
  import { ComponentPropsWithoutRef } from 'react'

  export type ${capitalizedNameForce}Props = ComponentPropsWithoutRef<'div'>
  export const ${capitalizedNameForce} = ({className}:${capitalizedNameForce}Props) => {
   const classNames = {
    root: styles.root,
  } as const

  return <div className={clsx(classNames.root,className)}></div>
  }
  `

  const sassPath = path.join(dirPath, `${capitalizedName}.module.scss`)
  const sassContent =
`.root {
  display: flex;
}
  `

  const indexPath = path.join(dirPath, `index.ts`)
  const indexContent = `export * from './${capitalizedName}'`

  //const storyPath = path.join(dirPath, `${capitalizedName}.stories.tsx`)
 // const storyContent =
// `import type { Meta, StoryObj } from '@storybook/react'

// import { ${capitalizedNameForce} } from './${capitalizedName}'

// const meta = {
//   component: ${capitalizedNameForce},
//   tags: ['autodocs'],
//   title: 'Components/${capitalizedNameForce}',
// } satisfies Meta<typeof ${capitalizedNameForce}>

// export default meta
// type Story = StoryObj<typeof meta>

// export const Default: Story = {
//   args: {},
// }
// `

  fs.mkdirSync(dirPath, { recursive: true })
  fs.writeFileSync(componentPath, componentContent)
  fs.writeFileSync(sassPath, sassContent)
  fs.writeFileSync(indexPath, indexContent)
  //fs.writeFileSync(storyPath, storyContent)

  /**
   * Executes formatting command on the created files.
   */

  exec(`pnpm run format:file ${dirPath}`, (err, stdout, stderr) => {
    if (err) {
      console.log(`Error formatting files:${err}`)

      return
    }

    // the *entire* stdout and stderr (buffered)

    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })

  /**
   * Executes linting command on the created files.
   */

  exec(`pnpm run lint:dir ${dirPath}/**`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error linting files: ${err}`)

      return
    }

    // the *entire* stdout and stderr (buffered)

    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
}

/**
 * Updates the main index file with an export for the new component.
 * @param {string} folderName - The name of the folder containing the component.
 * @param {string} componentName - The name of the component to add to the index.
 */

async function updateMainIndex(folderName, componentName) {
  const mainIndexPath = `./src/features/profile/${folderName}/index.ts`
  let mainIndexContent = ''

  try {
    mainIndexContent = await fsPromises.readFile(mainIndexPath, 'utf-8')
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Creating new index file for ${folderName}`)
    } else {
      console.error(`Error reading index file: ${error}`)

      return
    }
  }

  const lineToAdd = `export * from './${componentName}'`

  if (mainIndexContent.includes(lineToAdd)) {
    return
  }

  const mainIndexContentArray = mainIndexContent.split('\n')

  mainIndexContentArray.unshift(lineToAdd)

  await fsPromises.writeFile(mainIndexPath, mainIndexContentArray.join('\n'))
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The string to capitalize.
 * @param {boolean} upperCase - The string to capitalize or not
 * @returns {string} The string with its first letter capitalized.
 */

function capitalizeFirstLetter(string, upperCase = false) {
  if (upperCase) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  } else {
    return string
  }
}

// Get command line arguments

const folderName = process.argv[2]
const componentName = process.argv[3]
const upperCase = process.argv[4]

// Check if both folder name and component name are provided

if (!folderName || !componentName) {
  console.log('Please provide both folder name and component name')
  process.exit(1)
}

createComponent(folderName, componentName)
void updateMainIndex(folderName, capitalizeFirstLetter(componentName, Boolean(upperCase)))
