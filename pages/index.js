/* eslint-env browser */
import useSWR, { mutate } from 'swr'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const fetcher = url => fetch(url).then(r => r.json())

export default function Home () {
  // SWR first returns the data from cache (stale),
  // then sends the fetch request (revalidate),
  // and finally comes with the up-to-date data again.
  const { data, error } = useSWR('/api/query', fetcher, {
    refreshInterval: 3000,
    initialData: { count: 0 }
  })

  if (error) {
    return (<div>{error.message || error}</div>)
  }

  const inc = async () => {
    // Increase the global shared state by 1
    fetch('/api/command', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        command: 'INC',
        value: 1
      })
    })
    // Optimistic rendering:
    // Applying local mutations to data is a good way to make changes feel faster
    // See https://github.com/vercel/swr#mutation-and-post-request
    mutate('/api/query', { ...data, count: data.count + 1 }, false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>next-swr-now</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div>Current count: {data.count}</div>
        <button onClick={inc}>+</button>
      </main>
    </div>
  )
}
