<script>
    import { onMount } from "svelte";
    import { Form, TableRows } from "./";
    import { checkId } from '../helpers';

    let tasks = [];
    onMount(() => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    });

    const addNewTask = ({ detail }) => {

        let idAlreadyExists = checkId( tasks, detail );
        if ( idAlreadyExists ) {
            detail = {
                ...detail,
                id: tasks.length
            }
        }

        tasks = [ ...tasks, detail ]
        localStorage.setItem( 'tasks', JSON.stringify(tasks) );
    }
</script>


<table>
    <tbody>
        <tr>
            <td colspan="5">
                <Form on:add-task={ addNewTask }/>
            </td>
        </tr>
        <tr>
            <th>#</th>
            <th>Task</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        { #each tasks as task}
            <TableRows { ...task } />
        {/each }
    </tbody>
</table>

<style>
    table{
        border-collapse: collapse;
        width: 100%;
    }
    th,
    :global(td) {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    :global(td) {
        width: 100px;
    }

    th {
        background-color: #f2f2f2;
    }

    @media screen and (min-width: 480px){
        table{
            width: 80%;
            margin: auto;
        }
    }
    @media screen and (min-width: 1200px){
        table{
            width: 60%;
        }
    }
</style>