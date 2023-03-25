import { FileSummary, FolderSummary } from '../../../types.js';

export const createCodeFileSummary = (
  filePath: string,
  projectName: string,
  fileContents: string,
): string => {
  return `
    You are acting as a documentation expert for a project called ${projectName}, which is a SQL platform for blockchain analytics.
    Below is the markdown from a file located at \`${filePath}\`. 
    The "title:" and "description:" fields explain the part of the project documented in this file.
    The file is either describing the "App", "Api", "Data Tables", or "Query" features of the project. You can tell by looking at the folders in the file path. "Reference" folder files belong to "Query".
    Write a detailed summary of the contents of this file.
    Have a bullet point list of each link, with a summary of the context surrounding each link.
    Keep your response between 100 and 500 words. 
    DO NOT RETURN MORE THAN 500 WORDS.
    Output should be in markdown format. 
    Do not say "this file is a part of the ${projectName} project".

    Code:
    ${fileContents}

    Response:

  `;
};

export const createCodeQuestions = (
  filePath: string,
  projectName: string,
  fileContents: string,
): string => {
  return `
    You are acting as a documentation expert for a project called ${projectName}.
    Below is the markdown of a file located at \`${filePath}\`. 
    The "title:" and "description:" fields explain the part of the project documented in this file.
    What are 3 questions that a super smart developer might have about this page? 
    Answer each question in 1-2 sentences. Output should be in markdown format.

    Code:
    ${fileContents}

    Questions and Answers:
    
  `;
};

export const folderSummaryPrompt = (
  folderPath: string,
  projectName: string,
  files: FileSummary[],
  folders: FolderSummary[],
): string => {
  return `
    You are acting as a documentation expert for a project called ${projectName}.
    You are currently documenting the folder located at \`${folderPath}\`. 
    
    Below is a list of the files in this folder and a summary of the contents of each file:

    ${files.map((file) => {
      return `
        Name: ${file.fileName}
        Summary: ${file.summary}    

      `;
    })}

    And here is a list of the subfolders in this folder and a summary of the contents of each subfolder:

    ${folders.map((folder) => {
      return `
        Name: ${folder.folderName}
        Summary: ${folder.summary}    

      `;
    })}


    Write a technical explanation of what the code in this file does
    and how it might fit into the larger project or work with other parts of the project.
    Give examples of how this code might be used. Include code examples where appropriate.
    Be concise. Include any information that may be relevant to a developer who is curious about this code.
    Keep you response under 400 words. Output should be in markdown format.
    Do not say "this file is a part of the ${projectName} project".
    Do not just list the files and folders in this folder.


    Response:
  `;
};
