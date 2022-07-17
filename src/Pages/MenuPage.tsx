import React from "react";
import MainMenuVanilla, { MainMenuItemData } from "../Components/Menu/MainMenuVanilla";

// import './DemoCardList.scss';


function MenuPage()
{
	let items: MainMenuItemData[] = [
		{
			name: "Scene",
			children: [
				{
					name: "New",
					children: [
						{ name: "Empty Scene" },
						{ name: "Triangle Example" },
						{ name: "Quad Example" },
						{ name: "Cube Example" },
						{ name: "Cylinder Example" },
						{ name: "UV Sphere Example" },
						{ name: "ISO Sphere Example" },
						{ name: "Character Example" }
					]
				},
				{
					name: "Open"
				},
				{
					name: "Open Recent",
					children: []
				},
				{
					name: "Save",
					children: []
				},
				{
					name: "Save As",
					children: []
				},
				{
					name: "Import",
					children: [
						{ name: "Autodesk's FBX" },
						{ name: "glTF 2.0" },
						{ name: "OBJ" }
					]
				},
				{
					name: "Export",
					children: [
						{ name: "Autodesk's FBX" },
						{ name: "glTF 2.0" },
						{ name: "OBJ" }
					]
				},
				{
					name: "Quit",
					children: []
				}
			]
		},
		{
			name: "Mesh",
			children: [
				{ name: "Copy" },
				{ name: "Edit" },
				{ name: "Delete" }
			]
		},
		{
			name: "Instance",
			children: [
				{
					name: "Create",
					children: [
						{ name: "Triangle" },
						{ name: "Quad" },
						{ name: "Cube" },
						{ name: "Cylinder" },
						{ name: "UV Sphere" },
						{ name: "ISO Sphere" }
					]
				},
				{ name: "Copy" },
				{ name: "Edit" },
				{ name: "Delete" }
			]
		},
		{
			name: "View",
			children: [
				{ name: "Default" },
				{ name: "Transparent" },
				{ name: "Wireframe" }
			]
		},
		{
			name: "Layers"
		},
		{
			name: "Learn",
			children: [
				{ name: "Progresive Tutorial" },
				{ name: "Features" }
			]
		}
	];
	
	return (
		<div className='menu-page'>
			<MainMenuVanilla items={items} />
		</div>
	);
}

export default MenuPage;