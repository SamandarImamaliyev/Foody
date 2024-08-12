import { useRouter } from 'next/router'
import React from 'react'

const index = () => {
    const router = useRouter()
    const restaurantId = router.query.id
    return (
        <div>index</div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default index