// import './Database.scss'
// import React, { useEffect } from 'react'

// import { firestore } from '../../index'
// import { collection, getDocs, addDoc, QuerySnapshot, doc, getDoc, FirestoreDataConverter } from 'firebase/firestore'


// class DbDocument {
// 	text: string = ''
// 	num: number = 0 
// }

// namespace db {
// 	class Account {
		
// 	}

// 	class Channel {

// 	}
// }


// const Database = () => {
// 	useEffect(() => {
// 		const f = async () => {
// 			try {
// 				const docs = await getDocs(collection(firestore, 'test_collection'))

// 				docs.forEach((doc) => {
// 					console.log(`${doc.id} => ${doc.data()}`);
// 				})

// 				const document = doc(firestore, 'test_collection/IaVYFoAWq8jC79BWoa0R');
// 				const f = await getDoc(document)
// 				console.log(`id ${f.id} data = ${(f.data() as any)['text']}`)

// 				// const doc_ref = await addDoc(collection(db, 'test_collection'), {
// 				// 	text: 'text_data',
// 				// 	num: 12
// 				// })

// 				// console.log(`Document adăugat ${doc_ref.id}`)
// 			}
// 			catch (e) {
// 				console.log(e)
// 			}
// 		}

// 		f()
// 	}, [])

// 	return <div className='Database'>
// 		<p>firebase</p>
// 	</div>
// }

// export default Database
export {}