import React from 'react'
import { Section, RestaurantForm } from '../../../components'

function CreateRestaurantScreen() {
  return (
    <>
      <Section title="Create Restaurant" icon="edit">
        <RestaurantForm />
      </Section>
    </>
  )
}

export default CreateRestaurantScreen