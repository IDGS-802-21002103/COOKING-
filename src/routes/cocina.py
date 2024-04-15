from flask import Blueprint, flash, redirect, render_template, url_for
from flask_login import current_user, login_required

from database.models import Insumo, InsumosReceta, Receta, SolicitudProduccion, db

cocina = Blueprint("cocina", __name__, url_prefix="/cocina")


@cocina.route("/cocinar")
@login_required
def cocinar():
    solicitudesProduccion = SolicitudProduccion.query.all()
    print(solicitudesProduccion)

    return render_template(
        "modulos/cocina/cocinar.html", solicitudesProduccion=solicitudesProduccion
    )


@cocina.route("/recetas")
@login_required
def recetas():
    return redirect(url_for("admin.receta"))


@cocina.route("/lotes/insumos")
@login_required
def lotes_insumos():
    return render_template("modulos/cocina/recetas.html")


@cocina.route("/aceptar-solicitud/<int:idSolicitud>")
@login_required
def aceptarSolicitud(idSolicitud):
    solicitudProduccion = SolicitudProduccion.query.get(idSolicitud)

    if solicitudProduccion:
        solicitudProduccion.estatus = 2

        insumosReceta = InsumosReceta.query.filter_by(
            idReceta=solicitudProduccion.idReceta
        ).all()

        receta = Receta.query.get(solicitudProduccion.idReceta)

        mensajeReceta = f"Descripción receta: \n{receta.descripcion}\n\n"
        mensajeReceta += "Los ingredientes para esta receta son:\n"

        for insumoReceta in insumosReceta:
            insumo = Insumo.query.get(insumoReceta.idInsumo)
            mensajeReceta += f"{insumo.nombre}: {insumoReceta.cantidad * solicitudProduccion.tandas:.2f} {insumo.unidad_medida}\n"

        db.session.commit()

        flash(mensajeReceta, "receta")

        return redirect(url_for("cocina.cocinar"))
    else:
        flash(
            "No se encontro la solicitud de producción con los datos proporcionados",
            "info",
        )
        return redirect(url_for("cocina.cocinar"))


@cocina.route("/finalizar-produccion/<int:idSolicitud>")
@login_required
def finalizarProduccion(idSolicitud):
    print("Finalizando producción")

    solicitudProduccion = SolicitudProduccion.query.get(idSolicitud)
    insumosRecetaProduccion = InsumosReceta.query.filter_by(
        idReceta=solicitudProduccion.idReceta
    ).all()

    print(insumosRecetaProduccion)

    if solicitudProduccion:
        return redirect(url_for("cocina.cocinar"))
    else:
        flash(
            "No se encontro la solicitud de producción con los datos proporcionados",
            "info",
        )
        return redirect(url_for("cocina.cocinar"))
