import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformdIngredients = Object.keys(props.ingredients)
                                        .map(igKey => {
                                            return [...Array(props.ingredients[igKey])]
                                                   .map((_, i) => {
                                                       return <BurgerIngredient key={igKey + i} type={igKey} />
                                                   })
                                        }).reduce((array, current) => array.concat(current), []);
    if (transformdIngredients.length === 0) {
        transformdIngredients = <p>Please start adding ingredients</p>
    }
                                         
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformdIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default Burger;