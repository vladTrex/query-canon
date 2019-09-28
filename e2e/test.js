import { ReactSelector } from 'testcafe-react-selectors';

fixture `Getting Started`
    .page `localhost:3000/`;

const todoInput = ReactSelector('AddTodo input')
    .withProps('itemID', 'todoInput');

const categoryInput = ReactSelector('AddTodo input')
    .withProps('itemID', 'todoCategory');

const saveButton = ReactSelector('AddTodo button')
    .withProps('itemID', 'saveButton');

test('App test', async t => {
    await t
        .typeText(todoInput, 'My Item')
        .typeText(categoryInput, 'My Category')
        .click(saveButton);
});