import React from 'react'

type Props = {
    enchere: any
}

export default function EnchereCard({ enchere }: Props) {
    return (
        <div>{enchere.make}</div>
    )
}
