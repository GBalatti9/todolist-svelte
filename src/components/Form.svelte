
<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const status = ['Done', 'In Progress', 'To Start'];

    let formData = {
        id: 0,
        task: '',
        status: 'Status',
        editing: false,
    }

    let error = '';
    $: noDisplay = error === '';

    const handleSubmit = () => {
        if (formData.task.trim().length === 0)   return error = 'Cannot set empty task';
        if (formData.status.trim() === 'Status') return error = 'Change the status, please';

        error = '';
        dispatch('add-task', formData);
        formData  = { id: 0, task: '', status: 'Status', editing: false };
    }

</script>

<form on:submit|preventDefault = { handleSubmit }>
    <fieldset>
        <legend>Add a new task</legend>
        
        <input type="task" placeholder="Task..." bind:value = { formData.task }>

        <select name="status" id="status"        bind:value = { formData.status }>
            <option value="Status" disabled>Status</option>
            { #each status as item }
                <option value={ item }> { item } </option>
            { /each }
        </select>

        <button type="submit"> New Task </button>
        
        <p class:noDisplay class="red">{ error }</p>
    </fieldset>
</form>

<style>

    .noDisplay{
        display: none;
    }

    .red{
        color: red;
    }

    button {
        cursor: pointer;
    }

</style>