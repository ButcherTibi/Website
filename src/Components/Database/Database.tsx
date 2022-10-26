/* eslint-disable @typescript-eslint/no-unused-vars */
import './Database.scss'
import React, { useEffect } from 'react'

import { firestore } from '../../index'
import { collection, getDocs, addDoc, QuerySnapshot, doc, getDoc, FirestoreDataConverter
} from 'firebase/firestore'
import { timedPromise } from '../../Common'


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


const Database = () => {
	// useEffect(() => {
	// 	const f = async () => {
	// 		try {
	// 			let docs = await timedPromise(getDocs(collection(firestore, 'test_collection')), 1000)
	// 			docs.forEach((doc) => {
	// 			 	console.log(`${doc.id} => ${doc.data()}`);
	// 			})

	// 			// const document = doc(firestore, 'test_collection/IaVYFoAWq8jC79BWoa0R');
	// 			// const f = await getDoc(document)
	// 			// console.log(`id ${f.id} data = ${(f.data() as any)['text']}`)
	// 		}
	// 		catch (e) {
	// 			console.log(e)
	// 		}
	// 	}

	// 	f()
	// }, [])
	

	return <div className='Database'>
		<p>firebase</p>
 	</div>
}

export default Database
// export {}