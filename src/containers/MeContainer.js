import React, {useState} from 'react';
import {Query, Mutation} from 'react-apollo';
import gql from "graphql-tag";

import {me, updateMe} from '../shared/graphql';

const Me = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    let input;

    return (
    <div>
        <Query
            query={me}
        >
            {resp => {
                const {loading, data, error} = resp;
                if (loading) return 'Loading...';
                if (error) return 'Error';

                return (<div>
                    <h2>{data.me.name}</h2>

                    {isUpdate ? (<Mutation mutation={updateMe}>
                        {(updateMe) => (
                            <div>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        updateMe({
                                            variables: {bio: input.value}
                                        });
                                        input.value = "";
                                        setIsUpdate(isUpdate => !isUpdate);
                                    }}
                                        >
                                        <input
                                        ref={node => {
                                        input = node;
                                    }}
                                        />
                                        <button type="submit">Update Bio</button>
                                        </form>
                                        </div>
                                        )}
                                        </Mutation>) : data.me.bio}

                                        <button onClick={() => setIsUpdate((isUpdate) => !isUpdate)}>
                                        {isUpdate ? "Close" : "Update"}
                                        </button>

                                        </div>)
                                        }}
                                        </Query>
                                        </div>
                                        );
                                        };

                                        export default Me;