import React from 'react';
import { useForm } from 'react-hook-form';

const PetCardEdit = ({ id, pets }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      petName: pets[id].name,
      breed: pets[id].breed,
      age: pets[id].age,
      gender: pets[id].gender,
      weight: pets[id].weight,
      height: pets[id].height,
      color: pets[id].color,
      hypoallegenic: pets[id].hypoallegenic,
      dietaryRestrictions: pets[id].dietaryRestrictions,
    },
  });

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form className="pet__card card-edit" onSubmit={handleSubmit(onSubmit)}>
      <img src={pets[id].photo} alt={pets[id].name} className="pet__card--photo photo-wide" />
      <div className="space-around w-25">
        <label className="pet__card--label">
          Name:
          <input className="pet__card--input" type="text" name="petName" ref={register} />
        </label>
        <label className="pet__card--label">
          Breed:
          <input name="breed" type="text" className="pet__card--input" ref={register} />
        </label>
        <label className="pet__card--label">
          Age:
          <input name="age" type="text" className="pet__card--input" ref={register} />
        </label>
        <label className="pet__card--label">
          Gender:
          <input name="gender" type="text" className="pet__card--input" ref={register} />
        </label>
        <label className="pet__card--label">
          Weight:
          <input name="weight" type="text" className="pet__card--input" ref={register} />
        </label>
        <label className="pet__card--label">
          Height:
          <input name="height" type="text" className="pet__card--input" ref={register} />
        </label>
        <label className="pet__card--label">
          Color:
          <input name="color" type="text" className="pet__card--input" ref={register} />
        </label>
      </div>
      <div className="flex-col-25">
        <p className="pet__card--date-lg">Date Listed: 12/12/2020</p>
        <p className="pet__card--status">Hypoallergenic: {pets[id].hypoallegenic ? 'Yes' : 'No'}</p>
        <p className="pet__card--status">Dietary Restrictions: {pets[id].dietaryRestrictions}</p>
        <p className="pet__card--status">
          Status: <b>{pets[id].status}</b>
        </p>
      </div>
    </form>
  );
};

export default PetCardEdit;
