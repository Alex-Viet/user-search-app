import { Octokit } from '@octokit/core'

export const getUsers = async (name) => {
  const octokit = new Octokit({
    auth: `Bearer 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`,
  })

  try {
    const response = await octokit.request(`GET /search/users?q=${name}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-type': 'application/json',
      },
    })

    return response
  } catch (error) {
    console.error(error)
  }
}
