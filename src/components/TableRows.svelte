<script>
    import { fade } from 'svelte/transition';
    export let id, task, status, editing, handleDelete, handleEdit, closeEditing, handleInputChange, save;
    const statusList = ['Done', 'In Progress', 'To Start'];

    let taskInput;
    $: if ( taskInput ) {
        taskInput.focus();
    }

</script>

<tr class="table-row" transition:fade>
    <td class="id-column"> { id } </td>
    { #if editing }
        <td>
            <input type="text" name='task' bind:value = { task } bind:this = { taskInput } class="edit-input" on:change={ (e) => handleInputChange( e, id ) }>
        </td>
        {:else}
        <td> { task } </td>
    { /if }

    { #if editing }
    <td>
        <select name="status" bind:value = { status } on:change={ ( e ) => handleInputChange( e, id ) }>
            { #each statusList as item}
            <option value={item}> {item} </option>
            {/each }
        </select>
    </td>
    { :else }
        <td> 
            <span class='status-format { status === 'Done' ? 'done' : status === 'In Progress' ? 'progress' : 'start'}'> 
                { status }
            </span> 
        </td>
    {/if}
    { #if editing }
        <td>
            <button on:click={ save }>
                <svg 
                xmlns        = "http://www.w3.org/2000/svg" 
                fill         = "none" 
                viewBox      = "0 0 24 24" 
                stroke-width = "1.5" 
                stroke       = "currentColor" 
                class        = "w-6 h-6">
                    <path 
                    stroke-linecap  = "round" 
                    stroke-linejoin = "round" 
                    d               = "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
            </button>
            <button on:click = { closeEditing }>
                <svg 
                xmlns        = "http://www.w3.org/2000/svg" 
                fill         = "none" 
                viewBox      = "0 0 24 24" 
                stroke-width = "1.5" 
                stroke       = "currentColor" 
                class        = "w-6 h-6">
                    <path 
                    stroke-linecap  = "round" 
                    stroke-linejoin = "round" 
                    d               = "M6 18 18 6M6 6l12 12" />
                </svg>
                
            </button>
        </td>
    { :else }
    <td>
        <!-- EDIT -->
        <button on:click={ () => handleEdit( id ) }>
            <svg
                xmlns        = "http://www.w3.org/2000/svg"
                fill         = "none"
                viewBox      = "0 0 24 24"
                stroke-width = "1.5"
                stroke       = "currentColor"
                class        = "w-6 h-6"
            >
                <path
                    stroke-linecap  = "round"
                    stroke-linejoin = "round"
                    d               = "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
            </svg>
        </button>
    </td>
    { /if }
    <td>
        <!-- DELETE -->
        <button on:click={() => handleDelete( id ) }>
            <svg
                xmlns        = "http://www.w3.org/2000/svg"
                fill         = "none"
                viewBox      = "0 0 24 24"
                stroke-width = "1.5"
                stroke       = "currentColor"
                class        = "w-6 h-6"
            >
                <path
                    stroke-linecap  = "round"
                    stroke-linejoin = "round"
                    d               = "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
            </svg>
        </button>
    </td>
</tr>



<style>

    .id-column {
        width: 20px;
    }
    .status-format {
        padding       : 10px;
        border-radius : 5px;
        color         : white;
    }

    .start {
        background-color: rgba(245, 39, 39, 0.5);
    }

    .done {
        background-color: rgba(7, 182, 60, 0.5);
    }

    .progress {
        background-color: rgba(126, 122, 1, 0.5);
    }


    button {
        border     : 1px solid black;
        transition : all 0.2s ease-in-out;
    }

    button > svg {
        width  : 1rem;
        height : 1rem;
    }

    button:hover {
        cursor     : pointer;
        box-shadow : 1px 1px 1px black;
    }

    .table-row:hover td {
        background-color : #e0e0e0;
        border           : 1px solid #f3f3f3;
    }

    input, select {
        border-radius : 5px;
        text-align    : center;
        margin        : 0;
    }

    select{
        width: fit-content;
    }
    
    input{
        width            : 100%;
        border           : none;
        outline          : none;
        /* caret-color: red; */
        background-color : transparent;
    }


    /* .edit-container{
        width    : 100%;
        margin   : auto;
        overflow : hidden;
    } */
    /* td.editing {
        width: 100px; 
    } */
</style>
