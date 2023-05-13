const btn = document.querySelector('#feed');
const post = document.querySelector('.postContainer');
const product = document.querySelector('.phoneContainer');
const todo = document.querySelector('.todosContainer');

function createPost(obj){
    const card = document.createElement('div');
    card.className = 'card';

    const id = document.createElement('h4');
    id.className = 'id';
    id.innerText = `#${obj.id}`;
    card.appendChild(id);

    const h2 = document.createElement('h2');
    h2.innerText = obj.title;
    card.appendChild(h2);

    const desc = document.createElement('p');
    desc.innerText = obj.body;
    card.appendChild(desc);

    const tags = document.createElement('div');
    tags.className = 'tags';

    const h4 = document.createElement('h4');
    h4.innerText = `User ID: ${obj.userId}`;
    tags.appendChild(h4);
    for(let i = 0; i < obj.tags.length; i++){
        const span = document.createElement('span');
        span.innerText = obj.tags[i];
        tags.appendChild(span);
    }

    card.appendChild(tags);

    const reaction = document.createElement('div');
    reaction.className = 'reactions';
    const likes = document.createElement('div');
    likes.className = 'like';
    likes.innerHTML = '<span class="material-symbols-outlined">favorite</span>';
    reaction.appendChild(likes);
    const count = document.createElement('p');
    count.innerText = obj.reactions;
    reaction.appendChild(count);
    card.appendChild(reaction);

    post.appendChild(card);
}

function createProduct(obj){
    const card = document.createElement('div');
    card.className = 'phoneCard';

    const id = document.createElement('h4');
    id.className = 'id';
    id.innerText = `#${obj.id}`;
    card.appendChild(id);

    const details = document.createElement('div');
    details.className = 'details';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'imageContainer';
    const thumb = document.createElement('div');;
    thumb.className = 'thumb';
    thumb.style.backgroundImage = `url(${obj.thumbnail})`;
    imageContainer.appendChild(thumb);
    details.appendChild(imageContainer);

    const titles = document.createElement('div');
    titles.className = 'title';

    const h2 = document.createElement('h2');
    h2.innerText = obj.title;
    titles.appendChild(h2);
    const H4 = document.createElement('h4');
    H4.innerText = obj.brand;
    titles.appendChild(H4);
    const desc = document.createElement('p');
    desc.innerText = obj.description;
    titles.appendChild(desc);

    const stock = document.createElement('div');
    stock.className = 'stocks';
    const span1 = document.createElement('span');
    span1.innerText = `Category: ${obj.category}`;
    const span2 = document.createElement('span');
    span2.innerText = `Stock: ${obj.stock}`;
    stock.appendChild(span1);
    stock.appendChild(span2);

    titles.appendChild(stock);

    const price = document.createElement('div');
    price.className = 'discounts';
    const p1 = document.createElement('p');
    p1.innerHTML = `<span class="material-symbols-outlined">sell</span> ${obj.price} $`;
    const p2 = document.createElement('p');
    p2.innerText = `Discount: ${obj.discountPercentage} %`;
    const p3 = document.createElement('p');
    p3.innerHTML = `<span class="material-symbols-outlined">star</span> ${obj.rating}`;
    price.appendChild(p1);
    price.appendChild(p2);
    price.appendChild(p3);

    titles.appendChild(price);

    details.appendChild(titles);
    card.appendChild(details);

    const snaps = document.createElement('div');
    snaps.className = 'snaps'
    for(let i = 0; i<obj.images.length; i++){
        const imge = document.createElement('img');
        imge.src = obj.images[i];
        snaps.appendChild(imge);
    }
    card.appendChild(snaps);
    product.appendChild(card);
}

function createTodo(obj){
    const card = document.createElement('div');
    card.className = 'todoCard';

    const id = document.createElement('h4');
    id.className = 'id';
    id.innerText = `#${obj.id}`;
    card.appendChild(id);

    const p = document.createElement('p');
    p.innerText = obj.todo;
    card.appendChild(p);

    const completed = document.createElement('div');
    completed.className = 'completed';

    const h4 = document.createElement('h4');
    h4.innerText = `User ID: ${obj.userId}`;
    completed.appendChild(h4);

    const status = document.createElement('p');
    if(obj.completed==true){
        status.className = 'pass';
        status.innerHTML = '<span class="material-symbols-outlined">done</span>';
    }
    else{
        status.className = 'fail';
        status.innerHTML = '<span class="material-symbols-outlined">close</span>';
    }
    completed.appendChild(status);

    card.appendChild(completed);
    todo.appendChild(card);
}

function PromiseAPI1(){
    return new Promise((resolve,reject)=>{
        setTimeout(async()=>{
            try{
                const response = await fetch('https://dummyjson.com/posts');
                const data = await response.json()
                // console.log(data);
                const head1 = document.createElement('h1');
                head1.innerText = 'Posts';
                post.appendChild(head1);
                data.posts.forEach(obj => {
                    createPost(obj);
                });
                resolve(true)
            }
            catch(error){
                reject(false);
                // console.log(error);
            }
        }, 1000)
    })
    
}

function PromiseAPI2(){
    return new Promise((resolve,reject)=>{
        setTimeout(async()=>{
            try{
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json()
                // console.log(data);
                const head2 = document.createElement('h1');
                head2.innerText = 'Products';
                product.appendChild(head2);
                data.products.forEach(obj=>{
                    createProduct(obj);
                });
                resolve(true)
            }
            catch(error){
                reject(false);
                // console.log(error);
            }
        }, 2000)
    })
}

async function PromiseAPI3(){
    return new Promise((resolve,reject)=>{
        setTimeout(async()=>{
            try{
                const response = await fetch('https://dummyjson.com/todos');
                const data = await response.json()
                // console.log(data);
                const head3 = document.createElement('h1');
                head3.innerText = 'Todo';
                todo.appendChild(head3);
                data.todos.forEach(obj=>{
                    createTodo(obj);
                })
                resolve(true);
            }
            catch(error){
                reject(false);
                // console.log(error);
            }
        }, 3000)
    })
}



document.body.onload = function(){
    btn.addEventListener('click',async ()=>{
        const p1 = await PromiseAPI1();
        if(p1){
            const p2 = await PromiseAPI2();
            if(p2){
                await PromiseAPI3();
            }
        }
    });
}