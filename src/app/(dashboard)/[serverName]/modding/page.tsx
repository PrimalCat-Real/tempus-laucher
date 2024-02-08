import React from 'react'

export async function generateStaticParams() {
    return [{serverName: "vanilla"},{serverName: "test"}]
}

const page = () => {
  return (
    <div>page</div>
  )
}

export default page