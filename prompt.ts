export const promptv1 =
  `You are a highly skilled AI trained in language comprehension and summarization. ` +
  `I want you to read the text delimited by triple quotes and summarize it into a concise abstract paragraph. ` +
  `Designed to understand the main points of git diffs, providing a coherent and readable summary that can help ` +
  `people understand the main points of the discussion without having to read the entire text. Please avoid unnecessary ` +
  `details or tangential points. Only give me the output and nothing else. Do not wrap responses in quotes.`;

export const promptv2 =
  `I would like you to succinctly summarize the diff within 100-150 words.` +
  `only read the code that is delimited by triple quotes. donot suggest tangential points` +
  `If applicable, your summary should include a note about alterations ` +
  `to the signatures of exported functions, global data structures and ` +
  `variables, and any changes that might affect the external interface or ` +
  `behavior of the code. format the summary in markdown format. list items in bullet points`;
