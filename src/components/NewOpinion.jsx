import { useActionState } from "react";

export function NewOpinion() {
  function submitOpinionAction(prevFormState, formData) {
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    let errors = [];

    if (!data.userName.trim()) {
      console.log("Error: userName is empty");
      errors.push("Please enter your name.");
    }

    if (data.title.trim().length < 5) {
      console.log("Error: title less than 5 characters");
      errors.push("Please enter a title with at least 5 characters.");
    }

    if (data.body.trim().length < 10 || data.body.trim().length > 300) {
      console.log("Error: body is less than 10 or more than 300 characters");
      errors.push(
        "Please enter an opinion with at least 10 characters and at most 300 characters."
      );
    }

    if (errors.length > 0) {
      return { errors, enteredValues: data };
    }

    // submit the data to backend

    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(submitOpinionAction, {
    errors: null,
  });

  return (
    <div id='new-opinion'>
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className='control-row'>
          <p className='control'>
            <label htmlFor='userName'>Your Name</label>
            <input
              type='text'
              id='userName'
              name='userName'
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className='control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className='control'>
          <label htmlFor='body'>Your Opinion</label>
          <textarea
            id='body'
            name='body'
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <p className='actions'>
          <button type='submit'>Submit</button>
        </p>
      </form>
    </div>
  );
}
