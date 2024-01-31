<script>
    import { Form } from "./";

    let tasks = [];

    const newTask = ({ detail }) => {
        tasks = [ ...tasks, detail ]
    }
</script>


<table>
    <tbody>
        <tr>
            <td colspan="5">
                <Form on:add-task={ newTask }/>
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
            <tr>
                <td>{ task.id }</td>
                <td>{ task.task }</td>
                <td>{ task.status }</td>
                <td>Edit</td>
                <td>Delete</td>
            </tr>
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
</style>