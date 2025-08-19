<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\CostoCategoria;
use Illuminate\Http\Request;
use DB;

class CostoCategoriaController extends Controller
{
    public function index()
    {
        $registros = CostoCategoria::query()
            ->select('costos_categorias.*')
            ->join('categorias as c', 'c.id', '=', 'costos_categorias.categoria_id')
            ->join('temporadas as t', 't.id', '=', 'c.temporada_id')
            ->with(['categoria.temporada','concepto_cobro'])
            ->orderByDesc('t.fecha_inicio')
            ->get();

        return response()->json($registros);
    }

    public function categoriaCostoJugador($categoria_id)
    {
        $categorias = CostoCategoria::with(['categoria.temporada','concepto_cobro'])->where('categoria_id', $categoria_id)->get();

        return response()->json($categorias);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'concepto_cobro_id' => 'required|exists:conceptos_cobro,id',
            'monto_base' => 'required|numeric|min:1',
        ]);

        if(CostoCategoria::where('categoria_id',$data['categoria_id'])->where('concepto_cobro_id',$data['concepto_cobro_id'])->exists()){
            return response()->json(['message' => 'Registro duplicado'],422);
        }

        CostoCategoria::create($data);
        return response()->json(['message' => 'Registro guardado'],201);
    }

    public function show($id) {
        $registros = CostoCategoria::with(['categoria.temporada','concepto_cobro'])->find($id);

        if(!$registros) return response()->json(['message' => 'No encontrado'], 404);

        return response()->json($registros);
    }

    public function update(Request $request, $id) {
        $registros = CostoCategoria::find($id);

        if(!$registros) return response()->json(['message' => 'No encontrado'], 404);

        $data = $request->validate([
            'monto_base' => 'sometimes|numeric|min:1',
        ]);

        $registros->update($data);
        return response()->json(['message'=>'Registro actualizado'],201);
    }

    public function destroy($id) {
        $registros = CostoCategoria::find($id);

        if(!$registros) return response()->json(['message' => 'No encontrado'],404);

        $registros->delete();
        return response()->json(['message'=>'Registro eliminado']);
    }
}
