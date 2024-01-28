import { Octokit } from '@octokit/core'

export const getUsers = async (name, order, page, perPage) => {
  const octokit = new Octokit()

  octokit.hook.error('request', async (error) => {
    if (error.status === 422) {
      throw new Error('Доступ закрыт')
    }

    if (error.status === 403) {
      throw new Error('Превышен лимит')
    }
  })

  try {
    const response = await octokit.request(
      `GET /search/users?q=${name}&sort=repositories&order=${order}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    )

    return response
  } catch (error) {
    return error
  }
}
