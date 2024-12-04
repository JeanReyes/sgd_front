import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewMecanismo } from "../NuevoMecanimosForType";
import { Button } from "@/components/ui/button";
import { Dependencia } from "@/interfaces/dependencia";

interface Props {
  dependencias: Dependencia[];
  selectedDependencies: Dependencia[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDataMecanismo: React.Dispatch<React.SetStateAction<NewMecanismo>>;
}

export const SelectDependency = ({ dependencias, selectedDependencies, setStep, setDataMecanismo }: Props) => {
  const todoItems = dependencias.filter((dep) => !selectedDependencies.some((s) => s.id === dep.id));
  const doneItems = selectedDependencies as Dependencia[];

    const [todoList, todos] = useDragAndDrop<HTMLUListElement, Dependencia>(
      todoItems,
      {
        group: "A",
        multiDrag: true,
        selectedClass: "bg-blue-500 text-white",
      }
    );
    const [doneList, dones] = useDragAndDrop<HTMLUListElement, Dependencia>(
      doneItems,
      {
        group: "A",
        multiDrag: true,
        selectedClass: "bg-blue-500 text-white",
      }
    );

    const handleDependenciesSelected = () => {
      setDataMecanismo((prev) => {
        return {
          ...prev,
          ruta: dones.map((item) => item),
        };
      })
      setStep(3)
    }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-6 bg-gray-900 rounded-lg">
        {/* Dependencias Disponibles */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h2 className="text-white text-lg font-semibold mb-4">
            Dependencias Disponibles
          </h2>
          <ul ref={todoList} className="space-y-2 w-full h-full">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="kanban-item bg-gray-700 text-white p-3 rounded-lg border border-gray-600 shadow-sm cursor-pointer hover:bg-gray-600"
              >
                {todo.nombre}
              </li>
            ))}
          </ul>
        </div>

        {/* Dependencias Seleccionadas */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h2 className="text-white text-lg font-semibold mb-4">
            Dependencias Seleccionadas
          </h2>
          <ul ref={doneList} className="space-y-2 w-full h-full">
            {dones.map((done) => (
              <li
                key={done.id}
                className="kanban-item bg-gray-700 text-white p-3 rounded-lg border border-gray-600 shadow-sm cursor-pointer hover:bg-gray-600"
              >
                {done.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-white">
          El Orden configurado para la ruta de la Solicitud a crear será el
          siguiente:
        </h3>
        <ol className="list-decimal list-inside text-gray-300">
          {dones.map((dep, index) => (
            <li key={dep.id} className="mb-1">
              {dep.nombre}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={() => handleDependenciesSelected()}>Siguiente</Button>
      </div>
    </>
  );
};
