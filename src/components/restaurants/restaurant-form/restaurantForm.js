import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as restaurantsService from '../../../services/top-restaurant-service';
import Select from 'react-select';
import categories from '../../../data/categories.js';
import { isURL } from '../../../utils/validations.js';

function RestaurantForm() {
  const navigation = useNavigate();
  const { register, handleSubmit, setError, control, formState: { errors, isValid } } = useForm({ mode: 'onTouched' });

  const handleCreaterestaurantsubmit = (data) => {
    console.log(data);
    restaurantsService.createRestaurant(data)
      .then(restaurant => navigation('/'))
      .catch(error => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          console.log(errors);
          Object.keys(error.response.data.errors)
            .forEach((error) => {
              setError(error, {  message: errors[error].message })
            })
        }
      })
  }

  return (
    <form onSubmit={handleSubmit(handleCreaterestaurantsubmit)}>
      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
        <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} placeholder="Restaurant title..." 
          {...register('title', { 
            required: 'Title is required', 
            maxLength: { value: 100, message: 'Title must be <= 100 chars' }
          })} />
        {errors.title && (<div className="invalid-feedback">{errors.title.message}</div>)}
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-edit fa-fw'></i></span>
        <textarea className="form-control" 
          {...register('description', {
            required: 'Description is required'
          })}
        />
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-picture-o fa-fw'></i></span>
        <input type="text" className={`form-control ${errors.thumbnail ? 'is-invalid' : ''}`} placeholder="Restaurant thumbnail..."
          {...register('thumbnail', {
            required: 'Thumbnail is required',
            validate: (value) => isURL(value) || 'URL is not valid'
          })} />
        {errors.thumbnail && (<div className="invalid-feedback">{errors.thumbnail.message}</div>)}
      </div>

      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
        <input type="text" className={`form-control ${errors.url ? 'is-invalid' : ''}`} placeholder="Restaurant url..."
          {...register('url', {
            required: 'url is required',
            validate: (value) => isURL(value) || 'URL is not valid' 
          })}/>
        {errors.url && (<div className="invalid-feedback">{errors.url.message}</div>)}
      </div>

      <Controller 
        name="categories"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <div className="input-group mb-1">
            <span className="input-group-text"><i className='fa fa-list fa-fw'></i></span>
            <Select className='form-control p-0' 
              value={categories.find((category) => category.value === value)} 
              onChange={(categories) => onChange(categories.map(category => category.value))} 
              onBlur={onBlur}
              isMulti
              options={categories}
              styles={{
                control: (base) => ({
                  ...base,
                  border: 0
                })
              }}/>
            {errors.categories && (<div className="invalid-feedback">{errors.categories.message}</div>)}
          </div>
        )}
      />

      <div className="d-grid mt-2">
        <button className="btn btn-primary" type='submit' disabled={!isValid}>Create Restaurant</button>
      </div>
    </form>
  )
}

export default RestaurantForm